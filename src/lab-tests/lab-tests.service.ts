import { Injectable } from '@nestjs/common';
import { CreateLabTestDto } from './dto/create-lab-test.dto';
import { UpdateLabTestDto } from './dto/update-lab-test.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';

@Injectable()
export class LabTestsService {
  constructor(@InjectModel(LabTest) private readonly labTestModel: typeof LabTest){}
  create(createLabTestDto: CreateLabTestDto) {
    return this.labTestModel.create(createLabTestDto);
  }

  findAll() {
    return this.labTestModel.findAll()
  }

  findOne(id: number) {
    return this.labTestModel.findByPk(id);
  }

  update(id: number, updateLabTestDto: UpdateLabTestDto) {
    return this.labTestModel.update(updateLabTestDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.labTestModel.destroy({where:{id}});
  }
}
