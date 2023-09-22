import { Controller, Get, Res, Query, HttpStatus } from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { GetAllResponseDto } from './get-all.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('Project')
export class GetAllProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/list')
  async findAll(
    @Res() response,
    @Query() query: ExpressQuery,
  ): Promise<GetAllResponseDto[]> {
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
