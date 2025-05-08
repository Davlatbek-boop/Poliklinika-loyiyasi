import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Appointment } from '../../appointments/models/appointment.model';
import { Patient } from '../../patients/models/patient.model';


interface IPaymentCreationAttr {
  appointmentId: number;
  patientId: number;
  amount: number;
  method: string;
  payment_date: Date;
}

@Table({ tableName: 'payments' })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare appointmentId: number;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patientId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare amount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare method: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  declare payment_date: Date;
}
