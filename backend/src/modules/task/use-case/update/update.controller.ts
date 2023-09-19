import {
  Controller,
  Put,
  Response,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from '../../service/task.service';
import { UpdateTaskRequestDto } from './update.request.dto';
import { UpdateTaskResponseDto } from './update.response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('task')
@ApiTags('Task')
export class UpdateController {
  constructor(private taskService: TaskService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Put('edit/:id')
  async update(
    @Body() payload: UpdateTaskRequestDto,
    @Response() res,
    @Param('id') id: string,
  ): Promise<UpdateTaskResponseDto> {
    try {
      const data = await this.taskService.updateTask(id, payload);
      return res
        .status(200)
        .json({ message: 'Task Updated Successfully', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
