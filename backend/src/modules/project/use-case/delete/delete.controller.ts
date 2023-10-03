import {
  Controller,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('project')
@ApiTags('Project')
export class DeleteProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async remove(@Res() response, @Param('id') id: string): Promise<any> {
    try {
      const result = await this.projectService.remove(id);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Delete project successfully',
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error?.status,
        message: error.response?.message,
      });
    }
  }
}
