import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { GetOneProjectResponseDto } from './get-one.response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('project')
@ApiTags('Project')
export class GetDetailProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('detail/:id')
  async findOne(
    @Res() response,
    @Param('id') id: string,
  ): Promise<GetOneProjectResponseDto> {
    try {
      const result = await this.projectService.findOne(id);
      return response.status(HttpStatus.OK).json({
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
