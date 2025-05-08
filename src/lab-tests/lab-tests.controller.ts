import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LabTest } from './models/lab-test.model';

@ApiTags('Laboratoriya tahlillari')
@Controller('lab-tests')
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @ApiOperation({ summary: 'Yangi laboratoriya tahlili qo‘shish' })
  @ApiResponse({
    status: 201,
    description: 'Tahlil muvaffaqiyatli yaratildi',
    type: LabTest,
  })
  @Post()
  create(@Body() createLabTestDto: CreateLabTestDto) {
    return this.labTestsService.create(createLabTestDto);
  }

  @ApiOperation({ summary: 'Barcha laboratoriya tahlillarini olish' })
  @ApiResponse({
    status: 200,
    description: 'Tahlillar ro‘yxati',
    type: [LabTest],
  })
  @Get()
  findAll() {
    return this.labTestsService.findAll();
  }

  @ApiOperation({ summary: 'ID orqali bitta tahlilni olish' })
  @ApiResponse({ status: 200, description: 'Tahlil topildi', type: LabTest })
  @ApiResponse({ status: 404, description: 'Tahlil topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labTestsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Tahlil maʼlumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Tahlil yangilandi', type: LabTest })
  @ApiResponse({ status: 404, description: 'Tahlil topilmadi' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }

  @ApiOperation({ summary: 'Tahlilni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Tahlil o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Tahlil topilmadi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labTestsService.remove(+id);
  }
}
