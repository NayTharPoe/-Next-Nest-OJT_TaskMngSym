import {
  Controller,
  Patch,
  Param,
  HttpStatus,
  Res,
  Body,
} from '@nestjs/common';
import { NotificationService } from '../../service/notification.service';
import { UpdateNotificationRequestDto } from './update.request.dto';
import { UpdateNotificationResponseDto } from './update.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('notification')
@ApiTags('Notification')
export class UpdateNotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Patch('edit/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationRequestDto,
  ): Promise<UpdateNotificationResponseDto> {
    try {
      const result = await this.notificationService.update(
        id,
        updateNotificationDto,
      );
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'notification update successfully',
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
