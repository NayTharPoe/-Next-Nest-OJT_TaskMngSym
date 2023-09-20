import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { LoginController } from './use-case/login/login.controller';
import { ForgetPasswordController } from './use-case/forget-password/forget-password.controller';
import { ChangePasswordController } from './use-case/change-password/change-password.controller';
import { ResetPasswordController } from './use-case/reset-password/reset-password.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  EmployeeEntity,
  employeeSchema,
} from '../employee/entities/employee.entities';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/common/constants/constant';
import { ForgetEmailService } from 'src/template/forgetEmail';
import { EmailService } from 'src/utils/sendMail';
import { VerifyAccountController } from './use-case/verify-account/verify-account.controller';
import { ConfigService } from '@nestjs/config';
import { TokenEntity, tokenSchema } from './tokens/entities/token.entities';
import { LogoutController } from './use-case/logout/logout.controller';
import { TokenService } from './tokens/service/token.service';

@Module({
  imports: [
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '1D' },
    }),
    MongooseModule.forFeature([
      { name: EmployeeEntity.name, schema: employeeSchema },
    ]),
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: tokenSchema },
    ]),
  ],
  providers: [
    AuthService,
    ForgetEmailService,
    EmailService,
    ConfigService,
    TokenService,
  ],
  controllers: [
    LoginController,
    ForgetPasswordController,
    ResetPasswordController,
    ChangePasswordController,
    VerifyAccountController,
    LogoutController,
  ],
})
export class AuthModule {}
