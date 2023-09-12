import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { employee } from './entities/employee.entities';
import { Model } from 'mongoose';
import * as randomstring from 'randomstring';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployeeRequestDto } from './use-case/create/create.request.dto';
import { VerifyEmailService } from 'src/template/verifyEmail';
import { EmailService } from 'src/utils/sendMail';
import { UpdateEmployeeRequestDto } from './use-case/update/update.request.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(employee.name) private employeeModel: Model<employee>,
    private readonly emailService: EmailService,
    private readonly verifyEmailService: VerifyEmailService,
    private readonly jwtService: JwtService,
  ) {}

  async getAllEmployee(): Promise<employee[]> {
    return await this.employeeModel.find();
  }

  async getEmployeeById(id: string): Promise<employee> {
    const employee = await this.employeeModel.findById(id);
    if (!employee) {
      throw new NotFoundException('No User with this id');
    }
    return employee;
  }

  async createEmployee(payload: CreateEmployeeRequestDto): Promise<any> {
    const employeeData = {
      employeeName: payload.employeeName,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      DOB: payload.DOB,
      position: payload.position,
    };

    const user = await this.employeeModel.findOne({
      email: employeeData.email,
    });
    if (user) {
      throw new NotFoundException('User is already exists!');
    }
    const randomPassword = randomstring.generate(8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const token = this.jwtService.sign({ email: employeeData.email });

    const data = {
      ...employeeData,
      password: hashedPassword,
      token,
    };
    await this.employeeModel.create(data);

    const verifyLink = `http://localhost:3000/verify?token=${token}`;

    const template = this.verifyEmailService.verifyTemplate(
      employeeData.email,
      verifyLink,
      randomPassword,
    );

    this.emailService.sendMail(employeeData.email, 'Verify Email', template);

    return data;
  }

  async updateEmployeeByID(
    id: string,
    employee: UpdateEmployeeRequestDto,
  ): Promise<employee> {
    const employeeUpdate = await this.employeeModel.findByIdAndUpdate(
      id,
      employee,
      {
        new: true,
      },
    );
    return employeeUpdate;
  }

  async dropEmployee(id: string): Promise<employee> {
    return await this.employeeModel.findByIdAndDelete(id);
  }
}
