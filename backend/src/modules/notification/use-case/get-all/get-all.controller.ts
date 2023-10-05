import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { NotificationService } from '../../service/notification.service';
import { GetAllNotificationResponseDto } from './get-all.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('notifications')
@ApiTags('Notification')
export class GetAllNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/list')
  async findAll(@Res() response): Promise<GetAllNotificationResponseDto[]> {
    try {
      const result = await this.notificationService.findAll();
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Retrieve all notification successfully',
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
