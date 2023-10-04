import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  EmployeeDocument,
  EmployeeEntity,
} from '../entities/employee.entities';
import { Model } from 'mongoose';
import * as randomstring from 'randomstring';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateEmployeeRequestDto } from '../use-case/create/create.request.dto';
import { VerifyEmailService } from 'src/template/verifyEmail';
import { EmailService } from 'src/utils/sendMail';
import { UpdateEmployeeRequestDto } from '../use-case/update/update.request.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { EmployeePaginationRequestDto } from 'src/common/dtos/request/employeePagination.req.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EmployeeEntity.name)
    private employeeModel: Model<EmployeeDocument>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    private readonly verifyEmailService: VerifyEmailService,
    private readonly jwtService: JwtService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async getAllEmployee({
    page,
    limit,
    keyword,
  }: EmployeePaginationRequestDto): Promise<any> {
    let options = {};
    if (keyword) {
      options = {
        $or: [
          { employeeName: new RegExp(keyword.toString(), 'i') },
          { email: new RegExp(keyword.toString(), 'i') },
        ],
      };
    }

    const totalEmployee = await this.employeeModel.countDocuments(options);

    const data = await this.employeeModel
      .find(options)
      .select('-password -token')
      .limit(limit)
      .skip(limit * (page - 1));

    if (data.length === 0) {
      throw new NotFoundException(`No item with this '${keyword}'`);
    }

    return { data, totalEmployee };
  }

  async getEmployeeById(id: string): Promise<EmployeeDocument> {
    const employee = await this.employeeModel
      .findById(id)
      .select('-password -token');
    if (!employee) {
      throw new NotFoundException('No User with this id');
    }
    return employee;
  }

  async createEmployee(
    payload: CreateEmployeeRequestDto,
    profile?: Express.Multer.File,
  ): Promise<any> {
    const employeeData = {
      employeeName: payload.employeeName,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      dob: payload.dob,
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

    let cloudImg;
    if (profile) {
      cloudImg = await this.cloudinary.uploadImage(profile).then((data) => {
        return { data: data.secure_url };
      });
    }

    const data = {
      ...employeeData,
      password: hashedPassword,
      token,
      profile: profile ? cloudImg.data : '',
    };

    await this.employeeModel.create(data);

    const verifyLink = `${this.configService.get(
      'CLIENT_DOMAIN',
    )}/auth/verify/${token}`;

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
    profile?: Express.Multer.File,
  ): Promise<EmployeeDocument> {
    const user = await this.employeeModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('No user with this id! you cannot update');
    }

    let cloudImg;
    if (profile) {
      cloudImg = await this.cloudinary.uploadImage(profile).then((data) => {
        return { data: data.secure_url };
      });
    }

    const data = {
      ...employee,
      profile: profile ? cloudImg.data : employee.profile,
    };

    const employeeUpdate = await this.employeeModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      },
    );
    return employeeUpdate;
  }

  async dropEmployee(id: string): Promise<EmployeeDocument> {
    const user = await this.employeeModel.findOne({ _id: id });

    if (!user) {
      throw new NotFoundException('No user with this id! you cannot delete');
    }
    return await this.employeeModel.findByIdAndDelete(id);
  }
}
