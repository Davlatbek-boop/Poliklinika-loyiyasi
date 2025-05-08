import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsPhoneNumber,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({
    example: 'Jasur Islomov',
    description: 'Shifokorning to‘liq ismi',
  })
  @IsString()
  @IsNotEmpty({ message: 'Ism-sharif majburiy' })
  full_name: string;

  @ApiProperty({
    example: 'jasur@example.com',
    description: 'Shifokorning elektron pochtasi',
  })
  @IsEmail({}, { message: 'Noto‘g‘ri email manzili' })
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Shifokorning paroli (ochiq ko‘rinishda, hash qilinmaydi)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Parol bo‘sh bo‘lmasligi kerak' })
  password: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Shifokorning telefon raqami',
  })
  @IsPhoneNumber('UZ', { message: 'Telefon raqami noto‘g‘ri formatda' })
  phone: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Shifokor rasmi (URL manzil)',
  })
  @IsUrl({}, { message: 'Rasm URL noto‘g‘ri formatda' })
  picture: string;

  @ApiProperty({ example: 5, description: 'Tajribasi (necha yil)' })
  @IsInt({ message: 'Tajriba butun son bo‘lishi kerak' })
  @Min(0, { message: 'Tajriba manfiy bo‘lishi mumkin emas' })
  experience: number;

  @ApiProperty({ example: 3, description: 'Shifokorning mutaxassislik ID raqami' })
  @IsInt({ message: 'Mutaxassislik ID butun son bo‘lishi kerak' })
  @Min(1, { message: 'Mutaxassislik ID 1 dan katta bo‘lishi kerak' })
  specialization_id: number
}
