import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import * as bcrypt from "bcrypt"

@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private readonly doctorModel: typeof Doctor){}
  async create(createDoctorDto: CreateDoctorDto) {

    const hashed_password = await bcrypt.hash(createDoctorDto.password, 7)
    
    return this.doctorModel.create({...createDoctorDto, hashed_password});
  }

  findAll() {
    return this.doctorModel.findAll();
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id)
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.update(updateDoctorDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.doctorModel.destroy({where: {id}});
  }

  findByEmail(email: string){
    return this.doctorModel.findOne({where: {email}})
  }
}
