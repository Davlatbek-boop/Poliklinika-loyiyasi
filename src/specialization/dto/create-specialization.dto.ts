import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSpecializationDto {
  @ApiProperty({ example: 'Kardiolog', description: 'Mutaxassislik nomi' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Yurak kasalliklari bo‘yicha mutaxassis', description: 'Mutaxassislik haqida izoh', required: false })
  @IsString()
  @IsOptional()
  description: string;
}
