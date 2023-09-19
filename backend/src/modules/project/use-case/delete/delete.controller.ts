import { Controller, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
// import { ProjectEntity } from '../../entities/project.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('Project')
export class DeleteProjectController {
  constructor(private readonly projectService: ProjectService) {}

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
