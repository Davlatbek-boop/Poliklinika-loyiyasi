import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import * as bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { PhoneStaffDto } from './dto/phone-staff.dto';
import * as otpGenerator from 'otp-generator';
import { AddMinutesToDate } from '../common/helpers/addMinutes';
import { Otp } from './models/otp.model';
import { BotService } from '../bot/bot.service';
import * as uuid from 'uuid';
import { decode, encode } from '../common/helpers/crypto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectModel(Staff) private readonly staffModel: typeof Staff,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    private readonly botService: BotService,
  ) {}
  async create(createStaffDto: CreateStaffDto) {
    const staff = await this.findByEmail(createStaffDto.email);

    if (staff) {
      throw new ConflictException('Bunday emailli staff mavjud');
    }

    createStaffDto.hashed_password = await bcrypt.hash(
      createStaffDto.hashed_password,
      7,
    );
    return this.staffModel.create(createStaffDto);
  }

  findAll() {
    return this.staffModel.findAll();
  }

  findAllWithDirector() {
    return this.staffModel.findAll({
      where: { roleId: { [Op.notIn]: [1, 2, 4] } },
    });
  }

  findAllWithAdmin() {
    return this.staffModel.findAll({
      where: { roleId: { [Op.notIn]: [1, 2] } },
    });
  }

  findOne(id: number) {
    return this.staffModel.findByPk(id);
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.update(updateStaffDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.staffModel.destroy({ where: { id } });
  }

  findByEmail(email: string) {
    return this.staffModel.findOne({ where: { email } });
  }

  async newOtp(phoneStaffDto: PhoneStaffDto) {
    const phone_number = phoneStaffDto.phone;

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const isSend = await this.botService.sendOtp(phone_number, otp);
    if (!isSend) {
      throw new BadRequestException("Avval botdan ro'yxatdan o'ting");
    }

    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);
    await this.otpModel.destroy({ where: { phone_number } });
    const newOtpData = await this.otpModel.create({
      id: uuid.v4(),
      otp,
      phone_number,
      expiration_time,
    });

    const details = {
      timestamp: now,
      phone_number,
      otp_id: newOtpData.id,
    };

    const encodedData = await encode(JSON.stringify(details));

    return {
      message: 'OTP botga yuborildi',
      verification_key: encodedData,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { verification_key, phone: phone_number, otp } = verifyOtpDto;

    const currentDate = new Date();
    const decodedData = await decode(verification_key);
    const details = JSON.parse(decodedData);
    if (details.phone_number != phone_number) {
      throw new BadRequestException('OTP bu telefon raqamga yuborilmagan');
    }

    const resultOTP = await this.otpModel.findByPk(details.otp_id);

    if (resultOTP == null) {
      throw new BadRequestException("Bunday OTP yo'q");
    }
    if (resultOTP.verified) {
      throw new BadRequestException('Bu OTP avval tekshirilgan');
    }

    if (resultOTP.expiration_time < currentDate) {
      throw new BadRequestException('Bu OTP ning vaqti tugagan');
    }

    if (resultOTP.otp != otp) {
      throw new BadRequestException('OTP mos emas');
    }
    const user = await this.staffModel.update(
      {
        is_active: true,
      },
      { where: { phone: phone_number }, returning: true },
    );

    if (!user[1][0]) {
      throw new BadRequestException("Bunday staff yo'q");
    }

    await this.otpModel.update(
      { verified: true },
      { where: { id: details.otp_id } },
    );

    return { message: "Tabriklaymiz, siz activ staff bo'ldingiz" };
  }
}
