import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Prescription } from './models/prescription.model';

@Injectable()
export class PrescriptionsService {
  constructor(@InjectModel(Prescription) private readonly prescriptionModel: typeof Prescription){}
  create(createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionModel.create(createPrescriptionDto);
  }

  findAll() {
    return this.prescriptionModel.findAll();
  }

  findOne(id: number) {
    return this.prescriptionModel.findByPk(id);
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionModel.update(updatePrescriptionDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.prescriptionModel.destroy({where: {id}});
  }
}
