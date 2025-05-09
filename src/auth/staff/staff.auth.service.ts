import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { StaffsService } from '../../staffs/staffs.service';
import { JwtService } from '@nestjs/jwt';
import { CreateStaffDto } from '../../staffs/dto/create-staff.dto';
import * as bcrypt from 'bcrypt';
import { LoginStaffDto } from './models/stuff-login.dto';
import { Request, Response } from 'express';
import { Staff } from '../../staffs/models/staff.model';
import { RolesService } from '../../roles/roles.service';

@Injectable()
export class StaffAuthService {
  constructor(
    private readonly staffService: StaffsService,
    private readonly jwtService: JwtService,
    private readonly rolesSevice: RolesService,
  ) {}

  async registratsiya(createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);
  }

  async login(loginStaffDto: LoginStaffDto, res: Response) {
    const staff = await this.staffService.findByEmail(loginStaffDto.email);
    if (!staff) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      loginStaffDto.password,
      staff.hashed_password,
    );

    if (!validPassword) {
      throw new BadRequestException("Email yoki Parol noto'g'ri");
    }

    const tokens = await this.tokensGenerate(staff);

    res.cookie('refresh-token-staff', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    staff.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await staff.save();

    res.status(200).send({
      message: `Salom staff ${staff.first_name}`,
      accessToken: tokens.accessToken,
    });
  }

  async logOut(req: Request, res: Response) {
    const cookieRefresh = req.cookies['refresh-token-staff'];

    if (!cookieRefresh) {
      throw new UnauthorizedException('Cookie da refresh token topilmadi');
    }

    const payload = await this.jwtService.decode(cookieRefresh);

    if (!payload) {
      throw new UnauthorizedException('Refresh token xato');
    }

    const staff = await this.staffService.findByEmail(payload.email);

    if (!staff) {
      throw new BadRequestException(
        'Bunday refresh tokenli foydalanuvchi topilmadi',
      );
    }

    res.clearCookie('refresh-token-staff', { httpOnly: true });

    staff.hashed_refresh_token = '';
    await staff.save();

    res.status(200).send({
      message: `Staff ${staff.first_name} logged out successfully`,
    });
  }

  async refreshToken(refreshToken: string, res: Response) {
    const decodeRefreshToken = await this.jwtService.decode(refreshToken);

    if (!decodeRefreshToken) {
      throw new UnauthorizedException('Refresh tokenda xatolik');
    }

    const staff = await this.staffService.findByEmail(decodeRefreshToken.email);

    if (!staff || !staff.hashed_refresh_token) {
      throw new NotFoundException('Doktor not found');
    }

    const validRefreshToken = await bcrypt.compare(
      refreshToken,
      staff.hashed_refresh_token,
    );

    if (!validRefreshToken) {
      throw new ForbiddenException('Forbidden');
    }

    const tokens = await this.tokensGenerate(staff);

    res.cookie('refresh-token-staff', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.REFRESH_COOKIE_TIME),
    });

    staff.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await staff.save();

    res.status(200).send({
      message: `Salom staff ${staff.first_name} Refresh token yangilandi`,
      accessToken: tokens.accessToken,
    });
  }




  async tokensGenerate(staff: Staff) {
    const role = await this.rolesSevice.findOne(staff.roleId);

    const roleName = role?.name;

    const payload = {
      id: staff.id,
      email: staff.email,
      phone: staff.phone,
      is_active: staff.is_active,
      role: roleName,
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
