import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../enums/gender.enum';
import { LabTest } from '../../lab-tests/models/lab-test.model';
import { Appointment } from '../../appointments/models/appointment.model';
import { Payment } from '../../payments/models/payment.model';
import { UUIDV4 } from 'sequelize';
import { UUID } from 'crypto';

interface IPatientCreationAttr {
  full_name: string;
  email: string;
  hashed_password: string;
  phone: string;
  birth_day: Date;
  address: string;
  gender: string;
}

@Table({ tableName: 'patient' })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 'Ali Valiyev', description: 'To‘liq ism' })
  @Column({ type: DataType.STRING })
  declare full_name: string;

  @ApiProperty({ example: 'ali@example.com', description: 'Email manzili' })
  @Column({ type: DataType.STRING })
  declare email: string;

  @ApiProperty({
    example: 'hashed_password_string',
    description: 'Xavfsiz (hashed) parol',
  })
  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @Column({ type: DataType.STRING })
  declare phone: string;

  @ApiProperty({ example: '1995-01-01', description: 'Tug‘ilgan sana' })
  @Column({ type: DataType.DATE })
  declare birth_day: Date;

  @ApiProperty({ example: 'Toshkent, Yunusobod', description: 'Manzil' })
  @Column({ type: DataType.STRING })
  declare address: string;

  @ApiProperty({ example: 'male', description: 'Jinsi (male/female)' })
  @Column({
    type: DataType.ENUM,
    values: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
  })
  declare gender: Gender;

  @ApiProperty({ example: true, description: 'Faollik holati' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({
    example: 'abc123link',
    description: 'Faollashtirish havolasi',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare activation_link: string;

  @ApiProperty({
    example: 'hashed_refresh_token_value',
    description: 'Refresh token (hashed)',
  })
  @Column({ type: DataType.STRING, defaultValue: '' })
  declare hashed_refresh_token: string;

  @HasMany(() => LabTest)
  labTests: LabTest[];

  @HasMany(() => Appointment)
  appointment: Appointment[];

  @HasMany(() => Payment)
  payment: Payment[];
}
