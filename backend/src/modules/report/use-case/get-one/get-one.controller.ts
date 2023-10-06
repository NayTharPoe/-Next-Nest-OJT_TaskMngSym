import { Controller, Get, Param, HttpStatus, Res } from '@nestjs/common';
import { GetOneReportResponseDto } from './get-one.response.dto';
import { ReportService } from '../../services/report.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('report')
@ApiTags('Report')
export class GetDetailReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('detail/:id')
  async findOne(
    @Res() response,
    @Param('id') id: string,
  ): Promise<GetOneReportResponseDto> {
    try {
      const result = await this.reportService.findOne(id);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'report retrieve successfully',
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
