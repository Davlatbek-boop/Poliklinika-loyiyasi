import { Module } from '@nestjs/common';
import { DoctorAuthService } from './doctor/doctor.auth.service';
import { DoctorAuthController } from './doctor/doctor.auth.controller';
import { DoctorsModule } from '../doctors/doctors.module';
import { JwtModule } from '@nestjs/jwt';
import { PatientsModule } from '../patients/patients.module';
import { PatientAuthController } from './patient/patient.auth.controller';
import { PatientAuthService } from './patient/patient.auth.service';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    DoctorsModule,
    PatientsModule,
  ],
  controllers: [DoctorAuthController, PatientAuthController],
  providers: [DoctorAuthService, PatientAuthService],
})
export class AuthModule {}
