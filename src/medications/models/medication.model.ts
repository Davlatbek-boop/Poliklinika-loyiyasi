import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Prescription } from '../../prescriptions/models/prescription.model';

interface IMedicationCreationAttr {
  name: string;
  description: string;
  manufacturer: string;
}

@Table({ tableName: 'medications' })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unikal dori ID raqami',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Paratsetamol',
    description: 'Dori nomi',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({
    example: 'Og‘riqni qoldiruvchi va isitmani tushiruvchi dori',
    description: 'Dori haqida qisqacha izoh',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @ApiProperty({
    example: 'Zamona Farm LLC',
    description: 'Dorini ishlab chiqaruvchi kompaniya nomi',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare manufacturer: string;

  @HasMany(() => Prescription)
  prescription: Prescription[];
}
