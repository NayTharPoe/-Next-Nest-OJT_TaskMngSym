import {
  Controller,
  Post,
  Request,
  Response,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../service/auth.service';
import { AuthGuard } from '../../guard/auth.guard';

@Controller('auth')
@ApiTags('Authentication')
export class LogoutController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
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
