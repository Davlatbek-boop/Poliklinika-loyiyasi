import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('To‘lovlar')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi to‘lov qo‘shish' })
  @ApiResponse({ status: 201, description: 'To‘lov muvaffaqiyatli qo‘shildi' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha to‘lovlarni ko‘rish' })
  @ApiResponse({ status: 200, description: 'To‘lovlar ro‘yxati' })
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'To‘lovni ID orqali topish' })
  @ApiResponse({ status: 200, description: 'Topilgan to‘lov ma’lumoti' })
  @ApiResponse({ status: 404, description: 'To‘lov topilmadi' })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'To‘lov ma’lumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'To‘lov muvaffaqiyatli yangilandi' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'To‘lovni o‘chirish' })
  @ApiResponse({ status: 200, description: 'To‘lov muvaffaqiyatli o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
