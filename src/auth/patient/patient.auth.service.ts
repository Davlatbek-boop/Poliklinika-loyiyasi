import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PatientsService } from '../../patients/patients.service';
import { JwtService } from '@nestjs/jwt';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { LoginPatientDto } from './dto/login-patient.dto';
import { Patient } from '../../patients/models/patient.model';

@Injectable()
export class PatientAuthService {
  constructor(
    private readonly patientService: PatientsService,
    private readonly jwtService: JwtService,
  ) {}

  async registratsiya(createPatientDto: CreatePatientDto) {
    const patient = await this.patientService.findByEmail(
      createPatientDto.email,
    );

    if (patient) {
      throw new ConflictException('Bunday emailli patient mavjud');
    }

    return this.patientService.create(createPatientDto);
  }

  async login(loginPatientDto: LoginPatientDto, res: Response) {
    const patient = await this.patientService.findByEmail(
      loginPatientDto.email,
    );
    if (!patient) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      loginPatientDto.password,
      patient.hashed_password,
    );

    if (!validPassword) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const tokens = await this.tokensGenerate(patient);

    res.cookie('refresh-token-patient', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    patient.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await patient.save();

    res.status(200).send({
      message: `Salom patient ${patient.full_name}`,
      accessToken: tokens.accessToken,
    });
  }

  async logOut(req: Request, res: Response) {
    const cookieRefresh = req.cookies['refresh-token-patient'];

    if (!cookieRefresh) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException('Refresh token xato');
    }

    const patient = await this.patientService.findByEmail(payload.email);

    if (!patient) {
      throw new BadRequestException(
        'Bunday refresh tokenli foydalanuvchi topilmadi',
      );
    }

    res.clearCookie('refresh-token-patient', { httpOnly: true });

    patient.hashed_refresh_token = '';
    await patient.save();

    res.status(200).send({
      message: `Patient ${patient.full_name} logged out successfully`,
    });
  }

  async refreshToken(refreshToken: string, res: Response) {
    const decodeRefreshToken = await this.jwtService.decode(refreshToken);

    if (!decodeRefreshToken) {
      throw new UnauthorizedException('Refresh tokenda xatolik');
    }

    const patient = await this.patientService.findByEmail(
      decodeRefreshToken.email,
    );

    if (!patient || !patient.hashed_refresh_token) {
      throw new NotFoundException('Patient not found');
    }

    const validRefreshToken = await bcrypt.compare(
      refreshToken,
      patient.hashed_refresh_token,
    );

    if (!validRefreshToken) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.tokensGenerate(patient);

    res.cookie('refresh-token-patient', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    patient.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await patient.save();

    res.status(200).send({
      message: `Salom patient ${patient.full_name} Refresh token yangilandi`,
      accessToken: tokens.accessToken,
    });
  }

  async tokensGenerate(patient: Patient) {
    const payload = {
      id: patient.id,
      email: patient.email,
      phone: patient.phone,
      is_active: patient.is_active,
      role: 'Patient',
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
