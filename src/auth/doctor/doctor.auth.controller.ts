import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateDoctorDto } from '../../doctors/dto/create-doctor.dto';
import { DoctorAuthService } from './doctor.auth.service';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/roles-auth.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Doctor Auth') // Swagger bo‘lim nomi
@Controller('auth/doctor')
export class DoctorAuthController {
  constructor(private readonly doctorAuthService: DoctorAuthService) {}

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post('registratsiya')
  @ApiOperation({ summary: 'Yangi shifokor ro‘yxatdan o‘tishi' })
  @ApiResponse({
    status: 201,
    description: 'Shifokor muvaffaqiyatli ro‘yxatdan o‘tdi',
  })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri ma’lumot kiritildi' })
  registratsiya(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorAuthService.registratsiya(createDoctorDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Shifokor login qilish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  @ApiResponse({ status: 401, description: 'Login yoki parol noto‘g‘ri' })
  login(@Body() loginDoctorDto: LoginDoctorDto, @Res() res: Response) {
    return this.doctorAuthService.login(loginDoctorDto, res);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Shifokorni logout qilish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli logout' })
  logOut(@Req() req: Request, @Res() res: Response) {
    return this.doctorAuthService.logOut(req, res);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token orqali access token yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tokenlar muvaffaqiyatli yangilandi',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token eskirgan yoki noto‘g‘ri',
  })
  refreshToken(
    @CookieGetter('refresh-token-doctor') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.doctorAuthService.refreshToken(refreshToken, res);
  }
}
