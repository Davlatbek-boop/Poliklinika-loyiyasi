import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StaffAuthService } from './staff.auth.service';
import { CookieGetter } from '../../common/decorators/cookie-getter.decorator';
import { CreateStaffDto } from '../../staffs/dto/create-staff.dto';
import { LoginStaffDto } from './dto/stuff-login.dto';
import { Request, Response } from 'express';
import { Roles } from '../../common/decorators/roles-auth.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Staff Auth')
@Controller('auth/staff')
export class StaffAuthController {
  constructor(private readonly StaffAuthService: StaffAuthService) {}

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post('registratsiya')
  @ApiOperation({ summary: 'Yangi xodim yaratish' })
  @ApiResponse({ status: 201, description: 'Xodim muvaffaqiyatli yaratildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri ma’lumot kiritildi' })
  registratsiya(@Body() createStaffDto: CreateStaffDto) {
    return this.StaffAuthService.registratsiya(createStaffDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Xodim login qilish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli login' })
  @ApiResponse({ status: 401, description: 'Login yoki parol noto‘g‘ri' })
  login(@Body() loginStaffDto: LoginStaffDto, @Res() res: Response) {
    return this.StaffAuthService.login(loginStaffDto, res);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Xodim logout qilish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli logout' })
  logOut(@Req() req: Request, @Res() res: Response) {
    return this.StaffAuthService.logOut(req, res);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh token orqali access token yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tokenlar muvaffaqiyatli yangilandi',
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token noto‘g‘ri yoki eskirgan',
  })
  refreshToken(
    @CookieGetter('refresh-token-staff') refreshToken: string,
    @Res() res: Response,
  ) {
    return this.StaffAuthService.refreshToken(refreshToken, res);
  }
}
