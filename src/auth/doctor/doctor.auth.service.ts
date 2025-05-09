import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from '../../doctors/models/doctor.model';
import { DoctorsService } from '../../doctors/doctors.service';
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { LoginDoctorDto } from './models/login-doctor.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class DoctorAuthService {
  constructor(
    private readonly doctorService: DoctorsService,
    private readonly jwtService: JwtService,
  ) {}

  async registratsiya(createDoctorDto: CreateDoctorDto) {
    const doctor = await this.doctorService.findByEmail(createDoctorDto.email);

    if (doctor) {
      throw new ConflictException('Bunday emailli doctor mavjud');
    }

    return this.doctorService.create(createDoctorDto);
  }

  async login(loginDoctorDto: LoginDoctorDto, res: Response) {
    const doctor = await this.doctorService.findByEmail(loginDoctorDto.email);
    if (!doctor) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      loginDoctorDto.password,
      doctor.hashed_password,
    );

    if (!validPassword) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const tokens = await this.tokensGenerate(doctor);

    res.cookie('refresh-token-doctor', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    doctor.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await doctor.save();

    res.status(200).send({
      message: `Salom doctor ${doctor.full_name}`,
      accessToken: tokens.accessToken,
    });
  }

  async logOut(req: Request, res: Response) {
    const cookieRefresh = req.cookies['refresh-token-doctor'];

    if (!cookieRefresh) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException('Refresh token xato');
    }

    const doctor = await this.doctorService.findByEmail(payload.email);

    if (!doctor) {
      throw new BadRequestException(
        'Bunday refresh tokenli foydalanuvchi topilmadi',
      );
    }

    res.clearCookie('refresh-token-doctor', { httpOnly: true });

    doctor.hashed_refresh_token = ""
    await doctor.save()

    res.status(200).send({
        message: `Doctor ${doctor.full_name} logged out successfully`
    })
  }

  async refreshToken(refreshToken: string, res: Response) {
    const decodeRefreshToken = await this.jwtService.decode(refreshToken)

    if(!decodeRefreshToken){
      throw new UnauthorizedException("Refresh tokenda xatolik")
    }

    const doctor = await this.doctorService.findByEmail(decodeRefreshToken.email)

    if(!doctor || !doctor.hashed_refresh_token){
      throw new NotFoundException("Doktor not found")
    }

    const validRefreshToken = await bcrypt.compare(refreshToken, doctor.hashed_refresh_token)

    if(!validRefreshToken){
      throw new ForbiddenException("Forbidden")
    }

    const tokens = await this.tokensGenerate(doctor);

    res.cookie('refresh-token-doctor', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    doctor.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await doctor.save();

    res.status(200).send({
      message: `Salom doctor ${doctor.full_name} Refresh token yangilandi`,
      accessToken: tokens.accessToken,
    });
  }



  
  async tokensGenerate(doctor: Doctor) {
    const payload = {
      id: doctor.id,
      email: doctor.email,
      phone: doctor.phone,
      is_active: doctor.is_active,
      role: 'doctor',
    };

    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCESS_TOKEN_TIME,
    });

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
