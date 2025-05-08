import { Injectable } from '@nestjs/common';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Specialization } from './models/specialization.model';

@Injectable()
export class SpecializationService {
  constructor(@InjectModel(Specialization) private readonly specializationModel: typeof Specialization){}
  
  create(createSpecializationDto: CreateSpecializationDto) {
    return this.specializationModel.create(createSpecializationDto);
  }

  findAll() {
    return this.specializationModel.findAll();
  }

  findOne(id: number) {
    return this.specializationModel.findByPk(id);
  }

  update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    return this.specializationModel.update(updateSpecializationDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.specializationModel.destroy({where: {id}});
  }
}
