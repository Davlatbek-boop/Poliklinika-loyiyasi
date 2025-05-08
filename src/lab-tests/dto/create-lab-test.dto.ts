import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsDateString } from 'class-validator';

export class CreateLabTestDto {
  @ApiProperty({ example: 1, description: 'Bemorga tegishli ID' })
  @IsInt()
  patientId: number;

  @ApiProperty({ example: 2, description: 'Shifokorga tegishli ID' })
  @IsInt()
  doctorId: number;

  @ApiProperty({ example: 'Qon tahlili', description: 'Tahlil turi' })
  @IsString()
  test_type: string;

  @ApiProperty({ example: 'Gemoglobin 13.5', description: 'Tahlil natijasi' })
  @IsString()
  result: string;

  @ApiProperty({
    example: '2025-05-07',
    description: 'Tahlil sanasi (YYYY-MM-DD)',
  })
  @IsDateString()
  test_date: string;
}
