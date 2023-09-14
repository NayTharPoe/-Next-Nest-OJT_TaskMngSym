import {
  Controller,
  Param,
  Response,
  NotFoundException,
  Get,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { GetOneTaskResponseDto } from './getOne.response.dto';

@Controller('task')
export class GetOneController {
  constructor(private taskService: TaskService) {}

  @Get('detail/:id')
  async getById(
    @Param('id') id: string,
    @Response() res,
  ): Promise<GetOneTaskResponseDto> {
    try {
      const data = await this.taskService.getTaskById(id);
      return res.status(200).json({ message: 'Get Task By id', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
