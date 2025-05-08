import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../appointments/models/appointment.model';
import { Prescription } from '../../prescriptions/models/prescription.model';

interface IMedicalRecordCreationAttr {
  appointmentId: number;
  visit_date: Date;
  treatment: string;
  diagnosis: string;
}

@Table({ tableName: 'medical-records' })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Tibbiy yozuv ID raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 4, description: 'Uchrashuv ID raqami' })
  @ForeignKey(() => Appointment)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare appointmentId: number;

  @ApiProperty({ example: '2025-05-07', description: 'Ko‘rik sanasi' })
  @Column({ type: DataType.DATE, allowNull: false })
  declare visit_date: Date;

  @ApiProperty({
    example: 'Antibiotiklar bilan 7 kunlik davolash',
    description: 'Berilgan davolash turi',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare treatment: string;

  @ApiProperty({
    example: 'O‘rta darajadagi bronxit',
    description: 'Tashxis qo‘yilgan kasallik',
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare diagnosis: string;

  @BelongsTo(() => Appointment)
  declare appointment: Appointment;

  @HasMany(()=> Prescription)
  prescription: Prescription[]
}
