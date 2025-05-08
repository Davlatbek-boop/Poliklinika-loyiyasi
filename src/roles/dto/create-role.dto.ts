import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Rol nomi (masalan: admin, user, manager)',
  })
  name: string;

  @ApiProperty({
    example: 'Tizimni toʻliq boshqarish huquqiga ega foydalanuvchi roli',
    description: 'Rolga oid qisqacha tavsif',
  })
  description: string;
}
