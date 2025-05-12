import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import { MailService } from '../mail/mail.service';
import { Sequelize } from 'sequelize-typescript';


@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly mailService: MailService,
    private readonly sequelize: Sequelize,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const doctor = await this.findByEmail(createPatientDto.email);

    if (doctor) {
      throw new ConflictException('Bunday emailli Bemor mavjud');
    }
    const hashed_password = await bcrypt.hash(createPatientDto.password, 7);

    const newPatient = await this.patientModel.create({
      ...createPatientDto,
      hashed_password,
    });

    try {
      await this.mailService.sendMail(newPatient);
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException('Emailga xat yuborishda xatolik');
    }

    return newPatient;
  }

  findAll() {
    return this.patientModel.findAll();
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id);
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientModel.update(updatePatientDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("Bunday foydalanuvchi yo'q");
    }
    const delUser = await this.patientModel.destroy({ where: { id } });
    return { message: "Foydalanuvchi o'chirildi", user };
  }

  findByEmail(email: string) {
    return this.patientModel.findOne({ where: { email } });
  }

  async activatePatient(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const updatedUser = await this.patientModel.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updatedUser[1][0]) {
      throw new BadRequestException('Patient already activated');
    }

    return {
      message: 'Patient activated successfully',
    };
  }


  async getPatientMedicalDetails(patient_id: number) {
    const query = `
      SELECT 
    mr.visit_date, 
    mr.diagnosis, 
    mr.treatment, 
    m.name AS medication_name,
    pr.dosage, 
    pr.duration
FROM patient p
JOIN appointments a ON p.id = a."patientId"
JOIN medical_records mr ON a.id = mr."appointmentId"
JOIN prescriptions pr ON mr.id = pr."medicalRecordId"
JOIN medications m ON pr."medicationId" = m.id
WHERE p.id = 27;

  `;

    const [results, metadeta] = await this.sequelize.query(query);

    return results;
  }
}
