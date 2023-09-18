import {
  Controller,
  Get,
  Response,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { GetAllTaskResponseDto } from './getAll.response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.request.dto';

@Controller('tasks')
@ApiTags('Task')
export class GetAllController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('list')
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page Number',
  })
  async getAllTask(
    @Response() res,
    @Query() query: PaginationRequestDto,
  ): Promise<GetAllTaskResponseDto> {
    try {
      const { data, totalTasks } = await this.taskService.getAllTaskList(query);
      return res
        .status(200)
        .json({ messag: 'Get All Task Lists', data, totalTasks });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
