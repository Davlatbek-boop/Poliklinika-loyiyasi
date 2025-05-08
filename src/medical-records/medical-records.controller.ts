import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { MedicalRecord } from './models/medical-record.model';

@ApiTags('Tibbiy yozuvlar')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi tibbiy yozuv yaratish' })
  @ApiResponse({
    status: 201,
    description: 'Yangi tibbiy yozuv muvaffaqiyatli yaratildi',
    type: MedicalRecord,
  })
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha tibbiy yozuvlarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Barcha tibbiy yozuvlar ro‘yxati',
    type: [MedicalRecord],
  })
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Tibbiy yozovni ID bo‘yicha olish' })
  @ApiResponse({
    status: 200,
    description: 'Tibbiy yozuv topildi',
    type: MedicalRecord,
  })
  @ApiResponse({
    status: 404,
    description: 'Tibbiy yozuv topilmadi',
  })
  findOne(@Param('id') id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Tibbiy yozuvni yangilash' })
  @ApiResponse({
    status: 200,
    description: 'Tibbiy yozuv muvaffaqiyatli yangilandi',
    type: MedicalRecord,
  })
  update(
    @Param('id') id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Tibbiy yozuvni o‘chirish' })
  @ApiResponse({
    status: 200,
    description: 'Tibbiy yozuv muvaffaqiyatli o‘chirildi',
  })
  @ApiResponse({
    status: 404,
    description: 'Tibbiy yozuv topilmadi',
  })
  remove(@Param('id') id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
