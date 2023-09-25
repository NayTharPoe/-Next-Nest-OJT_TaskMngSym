import {
  Controller,
  NotFoundException,
  Response,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from '../../service/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class VerifyAccountController {
  constructor(private authService: AuthService) {}

  @Post('verify/:token')
  async accountVerify(@Response() res, @Param('token') token: string) {
    try {
      await this.authService.accountVerify(token);
      return res.status(200).json({ message: 'Verify Account Successfully' });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
