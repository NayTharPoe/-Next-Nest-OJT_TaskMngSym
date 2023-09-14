import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LoginController } from './use-case/login/login.controller';
import { ForgetPasswordController } from './use-case/forget-password/forget-password.controller';
import { ChangePasswordController } from './use-case/change-password/change-password.controller';
import { ResetPasswordController } from './use-case/reset-password/reset-password.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { employeeSchema } from '../employee/entities/employee.entities';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/common/constants/constant';
import { ForgetEmailService } from 'src/template/forgetEmail';
import { EmailService } from 'src/utils/sendMail';
import { VerifyAccountController } from './use-case/verify-account/verify-account.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1D' },
    }),
    MongooseModule.forFeature([{ name: 'employee', schema: employeeSchema }]),
  ],
  providers: [AuthService, ForgetEmailService, EmailService, ConfigService],
  controllers: [
    LoginController,
    ForgetPasswordController,
    ResetPasswordController,
    ChangePasswordController,
    VerifyAccountController,
  ],
})
export class AuthModule {}
