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
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SpecializationService } from './specialization.service';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Mutaxassisliklar') // Swagger'da bo'lim nomi
@Controller('specialization')
export class SpecializationController {
  constructor(private readonly specializationService: SpecializationService) {}

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi mutaxassislik yaratish' })
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationService.create(createSpecializationDto);
  }

  @Roles('Admin','Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha mutaxassisliklarni ko‘rish' })
  findAll() {
    return this.specializationService.findAll();
  }

  @Roles('Admin','Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mutaxassislikni ko‘rish' })
  findOne(@Param('id') id: string) {
    return this.specializationService.findOne(+id);
  }


  @Roles('Admin','Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Mutaxassislikni tahrirlash (ID bo‘yicha)' })
  update(
    @Param('id') id: string,
    @Body() updateSpecializationDto: UpdateSpecializationDto,
  ) {
    return this.specializationService.update(+id, updateSpecializationDto);
  }

  @Roles('Admin','Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Mutaxassislikni o‘chirish (ID bo‘yicha)' })
  remove(@Param('id') id: string) {
    return this.specializationService.remove(+id);
  }
}
