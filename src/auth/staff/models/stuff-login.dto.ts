import { ApiProperty } from '@nestjs/swagger';

export class LoginStaffDto {
  @ApiProperty({
    example: 'staff@example.com',
    description: 'Xodimning ro‘yxatdan o‘tgan elektron pochtasi',
  })
  email: string;

  @ApiProperty({
    example: 'MySecurePassword123!',
    description: 'Xodimning paroli (ochiq holatda yuboriladi)',
  })
  password: string;
}
