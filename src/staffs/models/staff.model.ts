import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../roles/models/role.model'; // Role modelining yo'lini moslashtiring

interface IStaffCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  hashed_password: string;
  age: number;
  picture: string;
  phone: string;
  roleId: number;
}

@Table({ tableName: 'staff' })
export class Staff extends Model<Staff, IStaffCreationAttr> {
  @ApiProperty({ example: 'John', description: 'Staff first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Staff last name' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare last_name: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Staff email' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({ example: 'hashed_password', description: 'Hashed password' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare hashed_password: string;

  @ApiProperty({ example: 30, description: 'Staff age' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare age: number;

  @ApiProperty({ example: 'https://link_to_picture.com', description: 'Staff picture URL' })
  @Column({ type: DataType.STRING, defaultValue: "" })
  declare picture: string;

  @ApiProperty({ example: '+1234567890', description: 'Staff phone number' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({ example: 'hashed_refresh_token', description: 'Hashed refresh token' })
  @Column({ type: DataType.STRING })
  declare hashed_refresh_token: string;

  @ApiProperty({ example: true, description: 'Is the staff active' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({ example: 1, description: 'Role ID' })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare roleId: number;

  @BelongsTo(()=> Role)
  role: Role
}
