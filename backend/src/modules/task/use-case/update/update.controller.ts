import {
  Controller,
  Put,
  Response,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { UpdateTaskRequestDto } from './update.request.dto';
import { UpdateTaskResponseDto } from './update.response.dto';

@Controller('task')
export class UpdateController {
  constructor(private taskService: TaskService) {}

  @Put('edit/:id')
  async update(
    @Body() payload: UpdateTaskRequestDto,
    @Response() res,
    @Param('id') id: string,
  ): Promise<UpdateTaskResponseDto> {
    try {
      const data = await this.taskService.updateTask(id, payload);
      return res.status(200).json({ message: 'Update Task Created', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
