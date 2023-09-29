import { Controller, Post, Body, Response, UseGuards } from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { ChangeRequestDto } from './change.request.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../guard/auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class ChangePasswordController {
  constructor(private authService: AuthService) {}

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard)
  @Post('change-password')
  async change(@Body() payload: ChangeRequestDto, @Response() res) {
    await this.authService.changePassword(payload);
    return res.status(200).json({ message: 'Changed password successfully!' });
  }
}
