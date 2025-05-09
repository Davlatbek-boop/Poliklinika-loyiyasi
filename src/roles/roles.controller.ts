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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from '../common/decorators/roles-auth.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '../common/guards/auth.guard';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi rol yaratish' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Roles('Admin', 'Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha rollarni olish' })
  findAll() {
    return this.rolesService.findAll();
  }


  @Roles('Admin','Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha rolni olish' })
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }


  @Roles('Admin','Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha rolni yangilash' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }


  @Roles('Admin','Creator', 'Director')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha rolni o‘chirish' })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
