import {
  Controller,
  Post,
  Body,
  Response,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { ForgetRequestDto } from './forget.request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class ForgetPasswordController {
  constructor(private authService: AuthService) {}

  @Post('forget-password')
  async forget(@Body() payload: ForgetRequestDto, @Response() res) {
    try {
      await this.authService.forgetPassword(payload);
      return res
        .status(200)
        .json({ message: 'Reset password link send to your email!' });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
