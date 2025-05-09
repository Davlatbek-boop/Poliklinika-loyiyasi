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
import { LabTestsService } from './lab-tests.service';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LabTest } from './models/lab-test.model';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('Laboratoriya tahlillari')
@Controller('lab-tests')
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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


  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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


  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'ID orqali bitta tahlilni olish' })
  @ApiResponse({ status: 200, description: 'Tahlil topildi', type: LabTest })
  @ApiResponse({ status: 404, description: 'Tahlil topilmadi' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.labTestsService.findOne(+id);
  }


  @Roles('doctor')
  @UseGuards(RolesGuard)  
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Tahlil maʼlumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Tahlil yangilandi', type: LabTest })
  @ApiResponse({ status: 404, description: 'Tahlil topilmadi' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLabTestDto: UpdateLabTestDto) {
    return this.labTestsService.update(+id, updateLabTestDto);
  }


  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Tahlilni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Tahlil o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Tahlil topilmadi' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.labTestsService.remove(+id);
  }
}
