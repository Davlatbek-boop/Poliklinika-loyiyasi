import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { DoctorGuard } from '../common/guards/doctor.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Shifokorlar')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha shifokorlarni ko‘rish' })
  findAll() {
    return this.doctorsService.findAll();
  }

 @Get('top-revenue')
  async getTopRevenueDoctors() {
    return this.doctorsService.getDoctorsBySpecialization();
  }

  @Get('male-patients')
  async getMalePatientsByDoctorAndDate(
    @Query('email') doctorEmail: string,
    @Query('date') date: string,
  ) {
    return this.doctorsService.getMalePatientsByDoctorAndDate(
      doctorEmail,
      date,
    );
  }


   @Get('this-day/patients/:id')
  async getMalePatientsByDoctorThisDay(@Param('id') id: string) {
    return this.doctorsService.getMalePatientsByDoctorThisDay(+id);
  }
  

  
  

  @UseGuards(DoctorGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Shifokorni ID orqali ko‘rish' })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

   

  @UseGuards(DoctorGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Shifokor maʼlumotlarini tahrirlash' })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Shifokorni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }


}
