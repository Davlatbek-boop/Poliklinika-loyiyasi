import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './models/payment.model';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel(Payment) private readonly paymentModel: typeof Payment){}
  create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  findAll() {
    return this.paymentModel.findAll();
  }

  findOne(id: number) {
    return this.paymentModel.findByPk(id);
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return this.paymentModel.update(updatePaymentDto, {where:{id}, returning: true});
  }

  remove(id: number) {
    return this.paymentModel.destroy({where: {id}});
  }
}
