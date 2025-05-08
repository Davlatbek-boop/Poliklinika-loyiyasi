import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patients/models/patient.model';
import { Doctor } from '../../doctors/models/doctor.model';

interface ILabTestCreationAttr {
  patientId: number;
  doctorId: number;
  test_type: string;
  result: string;
  test_date: string;
}

@Table({ tableName: 'lab_tests' })
export class LabTest extends Model<LabTest, ILabTestCreationAttr> {
  @ApiProperty({ example: 1, description: 'Tahlil ID raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 2,
    description: 'Tahlil topshirgan bemorning ID raqami',
  })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patientId: number;

  @ApiProperty({
    example: 5,
    description: 'Tahlilni tekshirgan shifokorning ID raqami',
  })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctorId: number;

  @ApiProperty({ example: 'Qon tahlili', description: 'Tahlil turi' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare test_type: string;

  @ApiProperty({ example: 'Gemoglobin 13.5', description: 'Tahlil natijasi' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare result: string;

  @ApiProperty({
    example: '2025-05-07',
    description: 'Tahlil o‘tkazilgan sana (YYYY-MM-DD)',
  })
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare test_date: string;

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Doctor)
  doctor: Doctor;
}
