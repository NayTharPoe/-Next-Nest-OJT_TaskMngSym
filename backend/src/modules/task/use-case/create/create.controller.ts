import {
  Controller,
  Post,
  Response,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { CreateTaskRequestDto } from './create.request.dto';
import { CreateTaskResponseDto } from './create.response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('task')
@ApiTags('Task')
export class CreateController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
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
