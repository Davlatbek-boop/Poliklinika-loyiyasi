import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';

@Injectable()
export class StaffsService {
  constructor(@InjectModel(Staff) private readonly staffModel: typeof Staff){}
  create(createStaffDto: CreateStaffDto) {
    return this.staffModel.create(createStaffDto);
  }

  findAll() {
    return this.staffModel.findAll();
  }

  findOne(id: number) {
    return this.staffModel.findByPk(id);
  }

  update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.staffModel.update(updateStaffDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.staffModel.destroy({where:{id}});
  }
}
