import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Staff } from '../../staffs/models/staff.model';

interface IRoleCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttr> {
  @ApiProperty({ example: 1, description: 'Rol ID raqami (avtomatik yaratiladi)' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: 'admin', description: 'Rol nomi' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({ example: 'Tizimni toʻliq boshqarish huquqi', description: 'Rolga tegishli tavsif' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @HasMany(()=> Staff)
  staff: Staff[]
}
