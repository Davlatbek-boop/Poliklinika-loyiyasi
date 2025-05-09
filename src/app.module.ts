import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientsModule } from './patients/patients.module';
import { Patient } from './patients/models/patient.model';
import { SpecializationModule } from './specialization/specialization.module';
import { Specialization } from './specialization/models/specialization.model';
import { DoctorsModule } from './doctors/doctors.module';
import { Doctor } from './doctors/models/doctor.model';
import { LabTestsModule } from './lab-tests/lab-tests.module';
import { LabTest } from './lab-tests/models/lab-test.model';
import { AppointmentsModule } from './appointments/appointments.module';
import { Appointment } from './appointments/models/appointment.model';
import { PaymentsModule } from './payments/payments.module';
import { Payment } from './payments/models/payment.model';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { MedicalRecord } from './medical-records/models/medical-record.model';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { MedicationsModule } from './medications/medications.module';
import { Medication } from './medications/models/medication.model';
import { Prescription } from './prescriptions/models/prescription.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/models/role.model';
import { StaffsModule } from './staffs/staffs.module';
import { Staff } from './staffs/models/staff.model';
import { AuthModule } from './auth/auth.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { BotModule } from './bot/bot.module';
import { Bot } from './bot/model/bot.model';
import { Otp } from './staffs/models/otp.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlevares: [],
        include: [BotModule],
      }),
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      database: process.env.PG_DB,
      password: process.env.PG_PASSWORD,
      models: [
        Patient,
        Specialization,
        Doctor,
        LabTest,
        Appointment,
        Payment,
        MedicalRecord,
        Medication,
        Prescription,
        Role,
        Staff,
        Bot,
        Otp,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    PatientsModule,
    SpecializationModule,
    DoctorsModule,
    LabTestsModule,
    AppointmentsModule,
    PaymentsModule,
    MedicalRecordsModule,
    PrescriptionsModule,
    MedicationsModule,
    RolesModule,
    StaffsModule,
    AuthModule,
    BotModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
