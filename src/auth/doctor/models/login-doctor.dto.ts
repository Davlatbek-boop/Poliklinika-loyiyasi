import { ApiProperty } from '@nestjs/swagger';

export class LoginDoctorDto {
  @ApiProperty({
    example: 'doctor@example.com',
    description: 'Shifokorning tizimda ro‘yxatdan o‘tgan email manzili',
  })
  email: string;

  @ApiProperty({
    example: 'DoctorPass456!',
    description: 'Shifokorning tizimga kirish paroli',
  })
  password: string;
}
