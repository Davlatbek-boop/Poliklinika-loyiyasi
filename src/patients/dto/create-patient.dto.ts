import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Gender } from '../../enums/gender.enum';

export class CreatePatientDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'To‘liq ism' })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Email manzili' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Parol' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @IsPhoneNumber("UZ", { message: 'Telefon raqami noto‘g‘ri formatda' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '1995-01-01', description: 'Tug‘ilgan sana' })
  @IsDateString()
  @IsNotEmpty()
  birth_day: Date;

  @ApiProperty({ example: 'Toshkent, Yunusobod', description: 'Manzil' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'male', enum: Gender, description: 'Jinsi' })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;
}
