import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from '../../service/notification.service';
import { CreateNotificationRequestDto } from './create.request.dto';
import { CreateNotificationResponseDto } from './create.response.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('notification')
@ApiTags('Notification')
export class CreateNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @ApiBody({ type: [CreateNotificationRequestDto] })
  @Post('add')
  async create(
    @Res() response,
    @Body() createNotificationDto: CreateNotificationRequestDto[],
  ): Promise<CreateNotificationResponseDto[]> {
    try {
      const result = await this.notificationService.create(
        createNotificationDto,
      );
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'notification created successfully',
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error?.status,
        message: error.response?.message,
      });
    }
  }
}
