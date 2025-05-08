import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateMedicalRecordDto {
  @ApiProperty({ example: 3, description: 'Uchrashuv ID raqami' })
  @IsInt({ message: 'appointmentId butun son bo‘lishi kerak' })
  appointmentId: number;

  @ApiProperty({ example: '2025-05-07', description: 'Ko‘rik sanasi' })
  @IsDateString(
    {},
    { message: 'visit_date ISO formatda bo‘lishi kerak (YYYY-MM-DD)' },
  )
  visit_date: Date;

  @ApiProperty({
    example: '7 kun davomida antibiotiklar qabul qilish',
    description: 'Davolash yo‘nalishi',
  })
  @IsString({ message: 'treatment matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'treatment bo‘sh bo‘lishi mumkin emas' })
  treatment: string;

  @ApiProperty({
    example: 'Yengil darajadagi shamollash',
    description: 'Qo‘yilgan tashxis',
  })
  @IsString({ message: 'diagnosis matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'diagnosis bo‘sh bo‘lishi mumkin emas' })
  diagnosis: string;
}
