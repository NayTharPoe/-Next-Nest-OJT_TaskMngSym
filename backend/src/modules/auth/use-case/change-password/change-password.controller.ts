import { Controller, Post, Body, Response } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { ChangeRequestDto } from './change.request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class ChangePasswordController {
  constructor(private authService: AuthService) {}

  @Post('change-password')
  async change(@Body() payload: ChangeRequestDto, @Response() res) {
    await this.authService.changePassword(payload);
    return res.status(200).json({ message: 'Changed password successfully!' });
  }
}
