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
import { PrescriptionsService } from './prescriptions.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Retseptlar')
@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly prescriptionsService: PrescriptionsService) {}

  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi retsept yaratish' })
  @ApiResponse({ status: 201, description: 'Retsept muvaffaqiyatli yaratildi' })
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionsService.create(createPrescriptionDto);
  }


  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha retseptlarni ko‘rish' })
  @ApiResponse({ status: 200, description: 'Retseptlar ro‘yxati' })
  findAll() {
    return this.prescriptionsService.findAll();
  }

  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Bitta retseptni ko‘rish' })
  @ApiResponse({ status: 200, description: 'Topilgan retsept' })
  @ApiResponse({ status: 404, description: 'Retsept topilmadi' })
  findOne(@Param('id') id: string) {
    return this.prescriptionsService.findOne(+id);
  }

  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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


  @Roles('doctor')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Retseptni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Retsept o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.prescriptionsService.remove(+id);
  }
}
