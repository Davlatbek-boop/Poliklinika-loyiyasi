import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsPositive, IsString, Min } from 'class-validator';
import { AppointmentStatus } from '../../enums/appointment-status.enum';

export class CreateAppointmentDto {
  @ApiProperty({ example: 1, description: 'Bemor ID raqami' })
  @IsInt()
  @IsPositive()
  patientId: number;

  @ApiProperty({ example: 2, description: 'Shifokor ID raqami' })
  @IsInt()
  @IsPositive()
  doctorId: number;

  @ApiProperty({ example: 101, description: 'Xona raqami' })
  @IsInt()
  @Min(1)
  room_number: number;

  @ApiProperty({
    example: 'pending',
    description: 'Uchrashuv holati (pending, approved, canceled...)',
  })
  @IsEnum(AppointmentStatus)
  status: string;

  @ApiProperty({
    example: 'Yurak og‘rig‘i sababli',
    description: 'Uchrashuv sababi',
  })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: 150000, description: 'To‘lov miqdori (so‘mda)' })
  @IsInt()
  @Min(0)
  price: number;
}
