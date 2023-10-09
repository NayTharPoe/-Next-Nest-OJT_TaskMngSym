import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import {
  EmployeeDocument,
  EmployeeEntity,
} from 'src/modules/employee/entities/employee.entities';
import { LoginRequestDto } from '../use-case/login/login.request.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgetEmailService } from 'src/template/forgetEmail';
import { EmailService } from 'src/utils/sendMail';
import { ResetRequestDto } from '../use-case/reset-password/reset.request.dto';
import { ForgetRequestDto } from '../use-case/forget-password/forget.request.dto';
import { ChangeRequestDto } from '../use-case/change-password/change.request.dto';
import { ConfigService } from '@nestjs/config';
import { TokenService } from '../tokens/service/token.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(EmployeeEntity.name)
    private employeeModel: Model<EmployeeDocument>,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private forgetEmailService: ForgetEmailService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  // --------- login ---------------
  async loginService(payload: LoginRequestDto): Promise<any> {
    const user = await this.employeeModel.findOne({ email: payload.email });
    if (!user) {
      throw new NotFoundException('Email does not exist');
    }
    const passwordMatch = await bcrypt.compare(payload.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong Password!');
    }

    const data = {
      userId: user._id,
    };

    const token = this.jwtService.sign(data);

    this.tokenService.createToken(user.email, token);

    const result = {
      _id: user._id,
      employeeName: user.employeeName,
      email: user.email,
      address: user.address,
      phone: user.phone,
      dob: user.dob,
      position: user.position,
      profile: user.profile,
      token,
    };
    return result;
  }

  // --------- forget-password ------
  async forgetPassword(payload: ForgetRequestDto): Promise<void> {
    const email = payload.email;
    const user = await this.employeeModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('This user does not exist!');
    }

    const resetLink = `${this.configService.get(
      'CLIENT_DOMAIN',
    )}/auth/reset-password/${user._id}`;

    const content = this.forgetEmailService.forgetTemplate(email, resetLink);

    this.emailService.sendMail(email, 'Reset Password Link', content);
  }

  // --------- reset-password -------
  async resetPassword(id: string, payload: ResetRequestDto): Promise<void> {
    const { newPassword, confirmPassword } = payload;
    const user = await this.employeeModel.findOne({ _id: id });
    if (!user) {
      throw new NotFoundException('This user does not exist');
    }
    if (newPassword === confirmPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } else {
      throw new UnauthorizedException(
        'New password and confirm password must be same!',
      );
    }
  }

  // -------- change-password --------
  async changePassword(payload: ChangeRequestDto): Promise<void> {
    const { email, oldPassword, newPassword, confirmPassword } = payload;
    const user = await this.employeeModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('This user does not exist!');
    }

    const MatchPassword = await bcrypt.compare(oldPassword, user.password);

    if (!MatchPassword) {
      throw new UnauthorizedException('Wrong old password!');
    }

    if (oldPassword === newPassword) {
      throw new UnauthorizedException(
        'Old password and new password must not same!',
      );
    }

    if (newPassword === confirmPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
    } else {
      throw new UnauthorizedException(
        'New password and confirm password must same!',
      );
    }
  }

  // ------- account verify ---------
  async accountVerify(token: any): Promise<void> {
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const employeeData = await this.employeeModel.findOne({ token });
    if (employeeData) {
      await this.employeeModel.findOneAndUpdate(
        {
          token: employeeData.token,
        },
        {
          verified: true,
          token: null,
        },
      );
    }
  }

  // -------- Logout ---------------
  async logout(token: string): Promise<any> {
    await this.tokenService.findToken(token);
    await this.tokenService.deleteToken(token);
  }
}
