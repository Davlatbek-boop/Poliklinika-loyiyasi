import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../../doctors/models/doctor.model';

interface ISpecializationCreationAttr {
  name: string;
  description?: string;
}

@Table({ tableName: 'specializations' })
export class Specialization extends Model<
  Specialization,
  ISpecializationCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({
    example: 'Cardiologist',
    description: 'Name of the specialization',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @ApiProperty({
    example: 'Doctor specialized in heart diseases',
    description: 'Description',
    required: false,
  })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @HasMany(()=> Doctor)
  doctor: Doctor[]
}
