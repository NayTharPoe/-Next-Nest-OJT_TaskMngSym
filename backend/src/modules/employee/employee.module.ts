import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateController } from './use-case/create/create.controller';
import { GetOneController } from './use-case/get-one/get-one.controller';
import { DeleteController } from './use-case/delete/delete.controller';
import { UpdateController } from './use-case/update/update.controller';
import { GetAllController } from './use-case/get-all/get-all.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeSchema } from './entities/employee.entities';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/utils/sendMail';
import { VerifyEmailService } from 'src/template/verifyEmail';
import { SECRET_KEY } from 'src/common/constants/constant';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'employee', schema: employeeSchema }]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [
    CreateController,
    GetAllController,
    UpdateController,
    DeleteController,
    GetOneController,
  ],
  providers: [EmployeeService, EmailService, VerifyEmailService],
})
export class EmployeeModule {}
