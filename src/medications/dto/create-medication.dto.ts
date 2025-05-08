import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicationDto {
  @ApiProperty({ example: 'Paracetamol', description: 'Dori nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Og‘riq qoldiruvchi va isitma tushiruvchi dori', description: 'Dori haqida qisqacha' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'UZMED PHARMA', description: 'Ishlab chiqaruvchi kompaniya nomi' })
  @IsString()
  @IsNotEmpty()
  manufacturer: string;
}
