import { Module } from '@nestjs/common';
import { EmployeeService } from './service/employee.service';
import { CreateController } from './use-case/create/create.controller';
import { GetOneController } from './use-case/get-one/get-one.controller';
import { DeleteController } from './use-case/delete/delete.controller';
import { UpdateController } from './use-case/update/update.controller';
import { GetAllController } from './use-case/get-all/get-all.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeEntity, employeeSchema } from './entities/employee.entities';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/utils/sendMail';
import { VerifyEmailService } from 'src/template/verifyEmail';
import { SECRET_KEY } from 'src/common/constants/constant';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../auth/tokens/service/token.service';
import { TokenEntity, tokenSchema } from '../auth/tokens/entities/token.entities';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EmployeeEntity.name, schema: employeeSchema }]),
    MongooseModule.forFeature([{ name: TokenEntity.name, schema: tokenSchema }]),
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1D' },
    }),
  ],
  controllers: [
    GetAllController,
    CreateController,
    GetOneController,
    UpdateController,
    DeleteController,
  ],
  providers: [
    EmployeeService,
    EmailService,
    VerifyEmailService,
    CloudinaryService,
    ConfigService,
    TokenService,
  ],
})
export class EmployeeModule {}
