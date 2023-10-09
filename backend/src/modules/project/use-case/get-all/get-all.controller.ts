import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { GetAllProjectResponseDto } from './get-all.response.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.req.dto';
@Controller('projects')
@ApiTags('Project')
export class GetAllProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/list')
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
  })
  @ApiQuery({
    name: 'search',
    type: String,
    description: 'Search projectName, language and desc ..',
    required: false,
  })
  async findAll(
    @Res() response,
    @Query() query?: PaginationRequestDto,
  ): Promise<GetAllProjectResponseDto[]> {
    try {
      const result = await this.projectService.findAll(query);

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Retrieve all project successfully',
        data: result.projects,
        count: result.totalProjects,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error?.status,
        message: error.response?.message,
      });
    }
  }
}
