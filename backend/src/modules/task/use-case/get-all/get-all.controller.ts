import {
  Controller,
  Get,
  Response,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { GetAllTaskResponseDto } from './getAll.response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('tasks')
@ApiTags('Task')
export class GetAllController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('list')
  async getAllTask(@Response() res): Promise<GetAllTaskResponseDto> {
    try {
      const data = await this.taskService.getAllTaskList();
      return res.status(200).json({ messag: 'Get All Task Lists', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
