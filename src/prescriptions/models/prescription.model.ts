import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Medication } from '../../medications/models/medication.model';
import { MedicalRecord } from '../../medical-records/models/medical-record.model';


interface IPrescriptionCreationAttr {
  medicationId: number;
  medicalRecordId: number;
  dosage: string;
  duration: string;
}

@Table({ tableName: 'prescriptions' })
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttr
> {
  @ApiProperty({ example: 1, description: 'Dori ID raqami (foreign key)' })
  @ForeignKey(() => Medication)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare medicationId: number;

  @ApiProperty({
    example: 1,
    description: 'Tibbiy yozuv ID raqami (foreign key)',
  })
  @ForeignKey(() => MedicalRecord)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare medicalRecordId: number;

  @ApiProperty({
    example: '2 tabletka kuniga 3 mahal',
    description: 'Dozalash tartibi',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare dosage: string;

  @ApiProperty({ example: '7 kun', description: 'Davolanish davomiyligi' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare duration: string;

  @BelongsTo(()=> Medication)
  medication: Medication

  @BelongsTo(()=> MedicalRecord)
  medicalRecord: MedicalRecord
}
