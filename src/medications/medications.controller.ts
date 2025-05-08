import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Medication } from './models/medication.model';

@ApiTags('Dorilar') 
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi dori qo‘shish' })
  @ApiResponse({
    status: 201,
    description: 'Dori muvaffaqiyatli qo‘shildi',
    type: Medication,
  })
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha dorilar ro‘yxati' })
  @ApiResponse({
    status: 200,
    description: 'Dorilar ro‘yxati',
    type: [Medication],
  })
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Dori haqida maʼlumot olish' })
  @ApiResponse({ status: 200, description: 'Topilgan dori', type: Medication })
  @ApiResponse({ status: 404, description: 'Dori topilmadi' })
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Dori maʼlumotlarini yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Dori yangilandi',
    type: Medication,
  })
  update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Dorini o‘chirish' })
  @ApiResponse({ status: 200, description: 'Dori o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(+id);
  }
}
