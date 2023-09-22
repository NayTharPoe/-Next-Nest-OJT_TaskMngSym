import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { GetOneResponseDto } from './get-one.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('project')
@ApiTags('Project')
export class GetDetailProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('detail/:id')
  async findOne(
    @Res() response,
    @Param('id') id: string,
  ): Promise<GetOneResponseDto> {
    try {
      const result = await this.projectService.findOne(id);
      return response
        .status(HttpStatus.OK)
        .json({
          statusCode: HttpStatus.OK,
          message: 'Retrieve project successfully',
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
