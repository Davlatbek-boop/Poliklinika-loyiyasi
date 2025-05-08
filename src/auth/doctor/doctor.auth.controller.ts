import { Controller, Post, Body, Res, Get, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { DoctorAuthService } from './doctor.auth.service';
import { LoginDoctorDto } from './models/login-doctor.dto';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';

@Controller('auth/doctor')
export class DoctorAuthController {
  constructor(private readonly doctorAuthService: DoctorAuthService) {}

  @Post('registratsiya')
  registratsiya(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorAuthService.registratsiya(createDoctorDto);
  }

  @Post('login')
  login(@Body() loginDoctorDto: LoginDoctorDto, @Res() res: Response) {
    return this.doctorAuthService.login(loginDoctorDto, res);
  }

  @Get('logout')
  logOut(@Req() req: Request, @Res() res: Response) {
    return this.doctorAuthService.logOut(req, res);
  }

  @Post('refresh-token')
  refreshToken(@CookieGetter("refresh-token-doctor") refreshToken: string, @Res() res: Response) {
    return this.doctorAuthService.refreshToken(refreshToken, res);
  }
}
