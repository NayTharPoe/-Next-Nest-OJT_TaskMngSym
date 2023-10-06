import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { ReportService } from '../../services/report.service';
import { CreateReportRequestDto } from './create.request.dto';
import { CreateReportResponseDto } from './create.response.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('report')
@ApiTags('Report')
export class CreateReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiBody({ type: [CreateReportRequestDto] })
  @Post('add')
  async create(
    @Res() response,
    @Body() createReportDtoArray: CreateReportRequestDto[],
  ): Promise<CreateReportResponseDto[]> {
    try {
      const result = await this.reportService.create(createReportDtoArray);
      return response.status(HttpStatus.CREATED).json({
        statusCode: 200,
        message: 'report created successfully',
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
