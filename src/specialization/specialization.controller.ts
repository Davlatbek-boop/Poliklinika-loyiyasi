import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@ApiTags('Mutaxassisliklar') // Swagger'da bo'lim nomi
@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mutaxassislik yaratish' })
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.create(createSpecializationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mutaxassisliklarni ko‘rish' })
  findAll() {
    return this.specializationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mutaxassislikni ko‘rish' })
  findOne(@Param('id') id: string) {
    return this.specializationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mutaxassislikni tahrirlash (ID bo‘yicha)' }) 
  update(@Param('id') id: string, @Body() updateSpecializationDto: UpdateSpecializationDto) {
    return this.specializationService.update(+id, updateSpecializationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mutaxassislikni o‘chirish (ID bo‘yicha)' })
  remove(@Param('id') id: string) {
    return this.specializationService.remove(+id);
  }
}
