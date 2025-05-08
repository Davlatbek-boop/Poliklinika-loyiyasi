import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patients/models/patient.model';
import { Doctor } from '../../doctors/models/doctor.model';
import { Payment } from '../../payments/models/payment.model';
import { MedicalRecord } from '../../medical-records/models/medical-record.model';


interface IAppointmentCreationAttr {
  patientId: number;
  doctorId: number;
  room_number: number;
  status: string;
  reason: string;
  price: number;
}

@Table({ tableName: 'appointments' })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @ApiProperty({ example: 1, description: 'Uchrashuv ID raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 3, description: 'Bemor ID raqami' })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare patientId: number;

  @ApiProperty({ example: 2, description: 'Shifokor ID raqami' })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare doctorId: number;

  @ApiProperty({ example: 101, description: 'Xona raqami' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare room_number: number;

  @ApiProperty({
    example: 'pending',
    description: 'Uchrashuv holati (pending, confirmed, canceled)',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare status: string;

  @ApiProperty({ example: 'Bosh og‘rig‘i', description: 'Uchrashuv sababi' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare reason: string;

  @ApiProperty({ example: 50000, description: 'Tashrif narxi so‘mda' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare price: number;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @HasMany(()=> Payment)
  payment: Payment[]

  @HasMany(()=> MedicalRecord)
  medicalRecord: MedicalRecord[]
}
