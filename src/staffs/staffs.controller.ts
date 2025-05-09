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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StaffsService } from './staffs.service';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { StaffGuard } from '../common/guards/staff.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { PhoneStaffDto } from './dto/phone-staff.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Staffs')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Roles('Creator')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha xodimlarni olish' })
  findAll() {
    return this.staffsService.findAll();
  }

  @Roles('Admin', 'Creator')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get('admin')
  @ApiOperation({
    summary: 'Admin uchun barcha staff larni korish adminlardan tashqari',
  })
  findAllWithAdmin() {
    return this.staffsService.findAllWithAdmin();
  }

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get('director')
  @ApiOperation({
    summary:
      'Director uchun barcha hodimlarini korish director, adminlardan tashqari',
  })
  findAllWithDirector() {
    return this.staffsService.findAllWithDirector();
  }

  @UseGuards(StaffGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha o'zini malumotlarini olish" })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.staffsService.findOne(id);
  }


  @UseGuards(StaffGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha xodimni yangilash" })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(id, updateStaffDto);
  }


  @Roles('Creator', 'Admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha xodimni o'chirish" })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.staffsService.remove(id);
  }


  @HttpCode(HttpStatus.OK)
  @Post('new-otp')
  async newOtp(@Body() phoneStaffDto: PhoneStaffDto) {
    return this.staffsService.newOtp(phoneStaffDto);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto){
    return this.staffsService.verifyOtp(verifyOtpDto)
  }
}
