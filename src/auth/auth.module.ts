import { Module } from '@nestjs/common';
import { DoctorAuthService } from './doctor/doctor.auth.service';
import { DoctorAuthController } from './doctor/doctor.auth.controller';
import { DoctorsModule } from '../doctors/doctors.module';
import { JwtModule } from '@nestjs/jwt';
import { PatientsModule } from '../patients/patients.module';
import { PatientAuthController } from './patient/patient.auth.controller';
import { PatientAuthService } from './patient/patient.auth.service';
import { StaffAuthController } from './staff/staff.auth.controller';
import { StaffAuthService } from './staff/staff.auth.service';
import { StaffsModule } from '../staffs/staffs.module';
import { RolesService } from '../roles/roles.service';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    JwtModule.register({ global: true }),
    DoctorsModule,
    PatientsModule,
    StaffsModule,
    RolesModule
  ],
  controllers: [
    DoctorAuthController,
    PatientAuthController,
    StaffAuthController,
  ],
  providers: [DoctorAuthService, PatientAuthService, StaffAuthService],
})
export class AuthModule {}
