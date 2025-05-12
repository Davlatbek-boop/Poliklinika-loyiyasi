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
import { MedicalRecordsService } from './medical-records.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { MedicalRecord } from './models/medical-record.model';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Tibbiy yozuvlar')
@Controller('medical-records')
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @Roles('Doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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


  @Roles('Doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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


  @Roles('Doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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


  @Roles('Doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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
