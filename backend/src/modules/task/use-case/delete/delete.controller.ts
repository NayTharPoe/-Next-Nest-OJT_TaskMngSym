import {
  Controller,
  Response,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskService } from '../../service/task.service';

@Controller('task')
@ApiTags('task')
export class DeleteController {
  constructor(private taskService: TaskService) {}

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard)
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
