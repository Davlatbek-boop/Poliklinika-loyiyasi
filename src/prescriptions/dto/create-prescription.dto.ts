import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreatePrescriptionDto {
  @ApiProperty({ example: 1, description: 'Dori vositasi ID raqami' })
  @IsInt()
  medicationId: number;

  @ApiProperty({ example: 1, description: 'Tibbiy yozuv ID raqami' })
  @IsInt()
  medicalRecordId: number;

  @ApiProperty({
    example: '2 tabletka kuniga 3 mahal',
    description: 'Doza haqida maʼlumot',
  })
  @IsString()
  @IsNotEmpty()
  dosage: string;

  @ApiProperty({ example: '7 kun', description: 'Davolanish muddati' })
  @IsString()
  @IsNotEmpty()
  duration: string;
}
