import {
  Controller,
  Post,
  Request,
  Response,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';

@Controller('auth')
@ApiTags('Authentication')
export class LogoutController {
  constructor(private authService: AuthService) {}

  @Post('logout')
  async logout(@Request() req, @Response() res): Promise<any> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const result = await this.authService.logout(token);
      return res.status(200).json({ message: 'Logout Successfully', result });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
