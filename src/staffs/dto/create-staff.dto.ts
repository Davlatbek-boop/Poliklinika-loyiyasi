import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsEmail,
  MinLength,
  MaxLength,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class CreateStaffDto {
  @ApiProperty({
    description: 'Xodimning ismi',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Xodimning familiyasi',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Xodimning elektron pochta manzili',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Xodimning parolining hashlangan versiyasi',
    example: 'hashedPassword123!',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  hashed_password: string;

  @ApiProperty({
    description: 'Xodimning yoshi',
    example: 30,
  })
  @IsInt()
  @IsPositive()
  age: number;

  @ApiProperty({
    description: "Xodimning profil rasmining URL manzili yoki fayl yo'li",
    example: 'https://example.com/images/john.jpg',
  })
  @IsString()
  @IsNotEmpty()
  picture: string;

  @ApiProperty({
    description: 'Xodimning telefon raqami',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'Xodimning roli IDsi',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  roleId: number;
}
