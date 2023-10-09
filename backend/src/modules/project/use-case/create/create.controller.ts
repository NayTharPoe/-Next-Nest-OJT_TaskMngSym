import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { CreateProjectRequestDto } from './create.request.dto';
import { CreateProjectResponseDto } from './create.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('Project')
export class CreateProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('add')
  async create(
    @Res() response,
    @Body() createProjectDto: CreateProjectRequestDto,
  ): Promise<CreateProjectResponseDto> {
    try {
      const result = await this.projectService.create(createProjectDto);
      return response.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Create project successfully',
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
