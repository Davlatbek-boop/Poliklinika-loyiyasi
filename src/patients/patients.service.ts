import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const doctor = await this.findByEmail(createPatientDto.email);

    if (doctor) {
      throw new ConflictException('Bunday emailli Bemor mavjud');
    }
    const hashed_password = await bcrypt.hash(createPatientDto.password, 7);
    return this.patientModel.create({ ...createPatientDto, hashed_password });
  }

  findAll() {
    return this.patientModel.findAll();
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("Bunday foydalanuvchi yo'q");
    }
    const delUser = await this.patientModel.destroy({ where: { id } });
    return { message: "Foydalanuvchi o'chirildi", user };
  }

  findByEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }
}
