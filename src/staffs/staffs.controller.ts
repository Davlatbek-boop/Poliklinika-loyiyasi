import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { StaffsService } from './staffs.service';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { StaffGuard } from '../common/guards/staff.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PhoneStaffDto } from './dto/phone-staff.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { StaffPasswordDto } from './dto/password.dto';

@ApiTags('Staffs')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Roles('Creator')
  @UseGuards(RolesGuard, AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha xodimlarni olish' })
  @ApiResponse({ status: 200, description: 'Xodimlar roʻyxati qaytarildi' })
  findAll() {
    return this.staffsService.findAll();
  }

  @Roles('Admin', 'Creator')
  @UseGuards(RolesGuard, AuthGuard)
  @Get('admin')
  @ApiOperation({
    summary: 'Admin uchun barcha staff larni korish (adminlardan tashqari)',
  })
  @ApiResponse({ status: 200, description: 'Adminlar ro‘yxati chiqarildi' })
  findAllWithAdmin() {
    return this.staffsService.findAllWithAdmin();
  }

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard, AuthGuard)
  @Get('director')
  @ApiOperation({
    summary:
      'Director uchun barcha hodimlarini korish (director, adminlardan tashqari)',
  })
  @ApiResponse({
    status: 200,
    description: 'Directorlar ro‘yxati chiqarildi',
  })
  findAllWithDirector() {
    return this.staffsService.findAllWithDirector();
  }

  @UseGuards(StaffGuard, AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha o'zini malumotlarini olish" })
  @ApiParam({ name: 'id', type: Number, description: 'Staff ID' })
  @ApiResponse({ status: 200, description: 'Xodim maʼlumotlari topildi' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.staffsService.findOne(id);
  }

  @UseGuards(StaffGuard, AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha xodimni yangilash" })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateStaffDto })
  @ApiResponse({ status: 200, description: 'Xodim maʼlumotlari yangilandi' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffsService.update(id, updateStaffDto);
  }

  @Roles('Creator', 'Admin')
  @UseGuards(RolesGuard, AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha xodimni o'chirish" })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Xodim o‘chirildi' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.staffsService.remove(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post('new-otp')
  @ApiOperation({ summary: 'Telefon raqam orqali OTP yuborish' })
  @ApiBody({ type: PhoneStaffDto })
  @ApiResponse({ status: 200, description: 'OTP yuborildi' })
  async newOtp(@Body() phoneStaffDto: PhoneStaffDto) {
    return this.staffsService.newOtp(phoneStaffDto);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'OTP kodni tekshirish' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 200, description: 'OTP muvaffaqiyatli tasdiqlandi' })
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.staffsService.verifyOtp(verifyOtpDto);
  }

  @Patch('update/password/:id')
  @ApiOperation({ summary: 'Parolni yangilash' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: StaffPasswordDto })
  @ApiResponse({ status: 200, description: 'Parol muvaffaqiyatli yangilandi' })
  updatePassword(
    @Param('id') id: string,
    @Body() staffPasswordDto: StaffPasswordDto,
  ) {
    return this.staffsService.updatePassword(+id, staffPasswordDto);
  }
}
