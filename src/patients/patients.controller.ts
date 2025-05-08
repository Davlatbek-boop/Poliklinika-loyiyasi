import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('patients')
@ApiTags('Patients')  // Bu controller uchun swagger hujjatiga teg qo‘shadi
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi bemor yaratish' }) // Operatsiya haqida izoh
  @ApiResponse({
    status: 201,
    description: 'Bemor muvaffaqiyatli yaratildi',
  })
  @ApiResponse({
    status: 400,
    description: 'Noto‘g‘ri ma\'lumotlar',
  })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Bemorlar ro‘yxatini olish' })
  @ApiResponse({
    status: 200,
    description: 'Bemorlar ro‘yxati',
  })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bemorni ID orqali topish' })
  @ApiParam({ name: 'id', description: 'Bemorning unikal identifikatori' })
  @ApiResponse({
    status: 200,
    description: 'Bemor topildi',
  })
  @ApiResponse({
    status: 404,
    description: 'Bemor topilmadi',
  })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Bemorni yangilash' })
  @ApiParam({ name: 'id', description: 'Yangilanadigan bemorning IDsi' })
  @ApiResponse({
    status: 200,
    description: 'Bemor muvaffaqiyatli yangilandi',
  })
  @ApiResponse({
    status: 400,
    description: 'Noto‘g‘ri ma\'lumotlar',
  })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Bemorni o‘chirish' })
  @ApiParam({ name: 'id', description: 'O‘chiriladigan bemorning IDsi' })
  @ApiResponse({
    status: 200,
    description: 'Bemor muvaffaqiyatli o‘chirildi',
  })
  @ApiResponse({
    status: 404,
    description: 'Bemor topilmadi',
  })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
