import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Appointment } from './models/appointment.model';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Uchrashuvlar') // Swagger tag
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}


  @Roles('Admin', 'Creator', 'Receptionist', 'Patient')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi uchrashuv yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Uchrashuv yaratildi',
    type: Appointment,
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }


  @Roles('Admin', 'Creator', 'Receptionist')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha uchrashuvlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Uchrashuvlar ro‘yxati',
    type: [Appointment],
  })
  findAll() {
    return this.appointmentsService.findAll();
  }


  @Roles('Admin', 'Creator', 'Receptionist')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha uchrashuvni olish' })
  @ApiResponse({
    status: 200,
    description: 'Topilgan uchrashuv',
    type: Appointment,
  })
  @ApiResponse({ status: 404, description: 'Uchrashuv topilmadi' })
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }


  @Roles('Admin', 'Creator', 'Receptionist')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Uchrashuvni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Uchrashuv yangilandi',
    type: Appointment,
  })
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }


  @Roles('Admin', 'Creator', 'Receptionist')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Uchrashuvni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Uchrashuv o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}
