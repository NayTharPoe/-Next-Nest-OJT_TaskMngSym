import {
  Controller,
  Response,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskService } from '../../service/task.service';

@Controller('task')
@ApiTags('Task')
export class DeleteController {
  constructor(private taskService: TaskService) {}

  @Delete(':id')
  async delTask(@Response() res, @Param('id') id: string) {
    try {
      await this.taskService.removeTask(id);
      return res.status(200).json({ message: 'Task Deleted Successfully' });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
