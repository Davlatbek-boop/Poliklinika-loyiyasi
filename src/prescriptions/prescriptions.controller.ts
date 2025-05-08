import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Retseptlar')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi retsept yaratish' })
  @ApiResponse({ status: 201, description: 'Retsept muvaffaqiyatli yaratildi' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha retseptlarni ko‘rish' })
  @ApiResponse({ status: 200, description: 'Retseptlar ro‘yxati' })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta retseptni ko‘rish' })
  @ApiResponse({ status: 200, description: 'Topilgan retsept' })
  @ApiResponse({ status: 404, description: 'Retsept topilmadi' })
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Retseptni tahrirlash' })
  @ApiResponse({
    status: 200,
    description: 'Retsept muvaffaqiyatli yangilandi',
  })
  update(
    @Param('id') id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return this.prescriptionsService.update(+id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Retseptni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Retsept o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
