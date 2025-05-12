import { ConflictException, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.model';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
    private readonly sequelize: Sequelize,
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const hashed_password = await bcrypt.hash(createDoctorDto.password, 7);

    return this.doctorModel.create({ ...createDoctorDto, hashed_password });
  }

  findAll() {
    return this.doctorModel.findAll();
  }

  findOne(id: number) {
    return this.doctorModel.findByPk(id);
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return this.doctorModel.update(updateDoctorDto, {
      where: { id },
      returning: true,
    });
  }

  remove(id: number) {
    return this.doctorModel.destroy({ where: { id } });
  }

  findByEmail(email: string) {
    return this.doctorModel.findOne({ where: { email } });
  }

  async getDoctorsBySpecialization() {
    const query = `
      SELECT 
        sp.name AS specialization,
        d.full_name AS doctor_name,
        SUM(p.amount) AS total_revenue
      FROM "doctors" d
      JOIN "specializations" sp ON d.specialization_id = sp.id
      JOIN "appointments" app ON app."doctorId" = d.id
      JOIN "payments" p ON p."appointmentId" = app.id
      GROUP BY sp.name, d.full_name
      ORDER BY total_revenue DESC;
    `;

    const [results, metadeta] = await this.sequelize.query(query);
    return results;
  }

  // 2. sana va doctor emaili beriladi shu sanada doctorga
  // tegishli to'lov qilgan patientlar erkaklarini ro'yxatini chiqarish
  async getMalePatientsByDoctorAndDate(doctorEmail: string, date: string) {
    const query = `
    SELECT 
      p.full_name AS patient_name,
      p.email AS patient_email,
      p.gender AS patient_gender
    FROM "patient" p
    JOIN "appointments" a ON a."patientId" = p.id
    JOIN "doctors" d ON a."doctorId" = d.id
    JOIN "payments" pay ON pay."appointmentId" = a.id
    WHERE d.email = '${doctorEmail}'
    AND pay."createdAt"::date = '${date}'
    AND p.gender = 'male';
  `;

    const [results, metadeta] = await this.sequelize.query(query);

    return results;
  }

  // doctorni bugungi kutib turgan bemorlari
  async getMalePatientsByDoctorThisDay(id: number) {
    const query = `
   SELECT p.full_name, a.status, a.reason
FROM appointments a
JOIN patient p ON p.id = a."patientId"
WHERE a."doctorId" = ${id}
AND a.status = 'pending'
AND a."createdAt"::date = '2025-05-09';
  `;

    const [results, metadeta] = await this.sequelize.query(query);

    return results;
  }
}
