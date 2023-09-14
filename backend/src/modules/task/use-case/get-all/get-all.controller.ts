import { Controller, Get, Response, NotFoundException } from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { GetAllTaskResponseDto } from './getAll.response.dto';

@Controller('task')
export class GetAllController {
  constructor(private taskService: TaskService) {}

  @Get('list')
  async getAllTask(@Response() res): Promise<GetAllTaskResponseDto> {
    try {
      const data = await this.taskService.getAllTaskList();
      return res.status(200).json({ message: 'Get All Task Lists', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
