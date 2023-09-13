import {
  Controller,
  Post,
  Response,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { CreateTaskRequestDto } from './create.request.dto';
import { CreateTaskResponseDto } from './create.response.dto';

@Controller('task')
export class CreateController {
  constructor(private taskService: TaskService) {}

  @Post('add')
  async create(
    @Response() res,
    @Body() payload: CreateTaskRequestDto,
  ): Promise<CreateTaskResponseDto> {
    try {
      const data = await this.taskService.createTask(payload);
      return res.status(200).json({ message: 'New task created', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
