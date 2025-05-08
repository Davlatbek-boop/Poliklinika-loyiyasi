import { IsInt, IsEnum, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../../enums/payment-method.enum';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'Qabulga yozilish ID raqami' })
  @IsInt()
  appointmentId: number;

  @ApiProperty({ example: 3, description: 'Bemor ID raqami' })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: 150000, description: 'To‘lov summasi (so‘mda)' })
  @IsInt()
  amount: number;

  @ApiProperty({
    example: 'card',
    enum: PaymentMethod,
    description: 'To‘lov usuli: naqd, karta yoki onlayn',
  })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({
    example: '2025-05-07',
    description: 'To‘lov sanasi (YYYY-MM-DD formatda)',
  })
  @IsDateString()
  payment_date: Date;
}
