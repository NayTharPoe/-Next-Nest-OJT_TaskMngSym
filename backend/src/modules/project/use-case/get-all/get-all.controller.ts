import {
  Controller,
  Get,
  Res,
  Query,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { GetAllProjectResponseDto } from './get-all.response.dto';
import { ApiTags, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.req.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
@Controller('projects')
@ApiTags('Project')
export class GetAllProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard)
  @Get('/list')
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({ name: 'page', type: Number, description: 'Page number' })
  async findAll(
    @Res() response,
    @Query() query: PaginationRequestDto,
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
