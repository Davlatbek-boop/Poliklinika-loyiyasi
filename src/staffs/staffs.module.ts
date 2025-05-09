import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Staff } from './models/staff.model';
import { BotModule } from '../bot/bot.module';
import { Otp } from './models/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([Staff, Otp]), BotModule],
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService]
})
export class StaffsModule {}
