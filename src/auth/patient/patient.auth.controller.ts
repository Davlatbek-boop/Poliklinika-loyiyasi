import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PatientAuthService } from './patient.auth.service';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
import { Request, Response } from 'express';
import { LoginPatientDto } from './models/login-patient.dto';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';

@Controller('auth/patient')
export class PatientAuthController {
  constructor(private readonly patientAuthService: PatientAuthService) {}

  @Post('registratsiya')
  registratsiya(@Body() createPatientDto: CreatePatientDto) {
    return this.patientAuthService.registratsiya(createPatientDto);
  }

  @Post('login')
  login(@Body() loginPatientDto: LoginPatientDto, @Res() res: Response) {
    return this.patientAuthService.login(loginPatientDto, res);
  }

  @Get('logout')
  logOut(@Req() req: Request, @Res() res: Response) {
    return this.patientAuthService.logOut(req, res);
  }

  @Post('refresh-token')
  refreshToken(@CookieGetter("refresh-token-doctor") refreshToken: string, @Res() res: Response) {
    return this.patientAuthService.refreshToken(refreshToken, res);
  }
}
