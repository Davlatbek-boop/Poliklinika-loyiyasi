import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment) private readonly appointmentModel: typeof Appointment){}
  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentModel.create(createAppointmentDto);
  }

  findAll() {
    return this.appointmentModel.findAll();
  }

  findOne(id: number) {
    return this.appointmentModel.findByPk(id);
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentModel.update(updateAppointmentDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.appointmentModel.destroy({where:{id}});
  }
}
