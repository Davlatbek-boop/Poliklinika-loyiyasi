import { Table, Model, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Specialization } from '../../specialization/models/specialization.model';
import { LabTest } from '../../lab-tests/models/lab-test.model';
import { Appointment } from '../../appointments/models/appointment.model';

interface IDoctorCreationAttr {
  full_name: string;
  email: string;
  hashed_password: string;
  phone: string;
  picture: string;
  experience: number;
  specialization_id: number
}

@Table({ tableName: 'doctors' })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({ example: 1, description: 'Shifokorning ID raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Jasur Islomov',
    description: 'Shifokorning to‘liq ismi',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({
    example: 'jasur@example.com',
    description: 'Elektron pochta manzili',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @ApiProperty({
    example: 'hashed_password_123',
    description: 'Xavfsiz (hashlangan) parol',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqami' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Shifokor rasmi (URL)',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare picture: string;

  @ApiProperty({ example: 5, description: 'Tajribasi (yillarda)' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare experience: number;

  @ApiProperty({ example: true, description: 'Shifokor faollik holati' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ForeignKey(()=> Specialization)
  @ApiProperty({ example: 1, description: 'Specialization jadvali id si' })
  @Column({ type: DataType.INTEGER })
  declare specialization_id: number;

  @ApiProperty({
    example: 'hashed_refresh_token_string',
    description: 'Yangi tokenni yangilash uchun hash',
  })
  @Column({ type: DataType.STRING, allowNull: true })
  declare hashed_refresh_token: string;

  @BelongsTo(()=> Specialization)
  specialization: Specialization

  @HasMany(()=> LabTest)
  labTests: LabTest[]

  @HasMany(()=> Appointment)
  appointment: Appointment[]
}
