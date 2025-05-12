import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PatientAuthService } from './patient.auth.service';
import { CreatePatientDto } from '../../patients/dto/create-patient.dto';
import { Request, Response } from 'express';
import { LoginPatientDto } from './dto/login-patient.dto';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards/auth.guard';

@ApiTags('Patient Auth') // Swagger bo‘lim nomi
@Controller('auth/patient')
export class PatientAuthController {
  constructor(private readonly patientAuthService: PatientAuthService) {}

  @Post('registratsiya')
  @ApiOperation({ summary: 'Yangi bemorni ro‘yxatdan o‘tkazish' })
  @ApiResponse({
    status: 201,
    description: 'Bemor muvaffaqiyatli ro‘yxatdan o‘tdi',
  })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri ma’lumot' })
  registratsiya(@Body() createPatientDto: CreatePatientDto) {
    return this.patientAuthService.registratsiya(createPatientDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Bemor login qilish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  @ApiResponse({ status: 401, description: 'Login yoki parol noto‘g‘ri' })
  login(@Body() loginPatientDto: LoginPatientDto, @Res() res: Response) {
    return this.patientAuthService.login(loginPatientDto, res);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Bemor logout qilish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli logout' })
  logOut(@Req() req: Request, @Res() res: Response) {
    return this.patientAuthService.logOut(req, res);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token orqali access token yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tokenlar muvaffaqiyatli yangilandi',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token noto‘g‘ri yoki muddati o‘tgan',
  })
  refreshToken(
    @CookieGetter('refresh-token-patient') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.patientAuthService.refreshToken(refreshToken, res);
  }
}
