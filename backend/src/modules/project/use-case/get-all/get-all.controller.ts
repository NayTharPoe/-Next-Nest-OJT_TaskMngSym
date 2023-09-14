import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { GetAllProjectResponseDto } from './get-all.response.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller('projects')
@ApiTags('Project')
export class GetAllProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/list')
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({ name: 'page', type: Number, description: 'Page number' })
  async findAll(
    @Res() response,
    @Query() query: ExpressQuery,
  ): Promise<GetAllProjectResponseDto[]> {
    try {
      const result = await this.projectService.findAll(query);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Retrieve all project successfully',
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
