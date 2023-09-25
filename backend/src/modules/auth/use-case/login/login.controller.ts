import {
  Controller,
  Post,
  Body,
  Response,
  NotFoundException,
} from '@nestjs/common';
import { LoginRequestDto } from './login.request.dto';
import { AuthService } from '../../service/auth.service';
import { LoginResponseDto } from './login.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication')
export class LoginController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() createDto: LoginRequestDto,
    @Response() res,
  ): Promise<LoginResponseDto> {
    try {
      const result = await this.authService.loginService(createDto);
      return res.status(200).json({ message: 'Login Successfully', result });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
