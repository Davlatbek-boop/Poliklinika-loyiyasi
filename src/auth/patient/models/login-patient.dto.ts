import { ApiProperty } from '@nestjs/swagger';

export class LoginPatientDto {
  @ApiProperty({
    example: 'patient@example.com',
    description: 'Bemorning ro‘yxatdan o‘tgan email manzili',
  })
  email: string;

  @ApiProperty({
    example: 'PatientPassword789!',
    description: 'Bemorning tizimga kirish paroli',
  })
  password: string;
}
