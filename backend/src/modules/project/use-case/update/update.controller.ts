import {
  Controller,
  Body,
  Patch,
  Param,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from '../../service/project.service';
import { UpdateProjectRequestDto } from './update.request.dto';
import { UpdateProjectResponseDto } from './update.response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('project')
@ApiTags('Project')
export class UpdateProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard)
  @Patch('edit/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() createProjectDto: UpdateProjectRequestDto,
  ): Promise<UpdateProjectResponseDto> {
    try {
      const result = await this.projectService.update(id, createProjectDto);
      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Update project successfully',
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
