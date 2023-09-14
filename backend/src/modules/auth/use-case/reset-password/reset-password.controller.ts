import { Controller, Post, Body, Response, Param } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class ResetPasswordController {
  constructor(private authService: AuthService) {}

  @Post('reset-password/:id')
  async reset(@Body() payload: any, @Response() res, @Param('id') id: string) {
    await this.authService.resetPassword(id, payload);
    res.status(200).json({ message: 'Reset Password Successfully' });
  }
}
