import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@ApiTags('Staffs') 
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi xodim yaratish' })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha xodimlarni olish' })
  findAll() {
    return this.staffsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha xodimni olish" })
  findOne(@Param('id') id: string) {
    return this.staffsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "ID bo'yicha xodimni yangilash" })
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "ID bo'yicha xodimni o'chirish" })
  remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
