import {
  Controller,
  Param,
  Response,
  NotFoundException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { GetOneResponseDto } from 'src/modules/project/use-case/get-one/get-one.response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('task')
@ApiTags('Task')
export class GetOneController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('detail/:id')
  async getById(
    @Param('id') id: string,
    @Response() res,
  ): Promise<GetOneResponseDto> {
    try {
      const data = await this.taskService.getTaskById(id);
      return res.status(200).json({ message: 'Get Task By id', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
