import { Module } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prescription } from './models/prescription.model';

@Module({
  imports: [SequelizeModule.forFeature([Prescription])],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService],
})
export class PrescriptionsModule {}
