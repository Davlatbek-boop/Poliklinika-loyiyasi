import { Module } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { LabTestsController } from './lab-tests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LabTest } from './models/lab-test.model';

@Module({
  imports: [SequelizeModule.forFeature([LabTest])],
  controllers: [LabTestsController],
  providers: [LabTestsService],
})
export class LabTestsModule {}
