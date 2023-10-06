import { Controller, Delete, Param, HttpStatus, Res } from '@nestjs/common';
import { ReportService } from '../../services/report.service';
import { ReportEntity } from '../../entities/report.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('report')
@ApiTags('Report')
export class DeleteReportController {
  constructor(private readonly reportService: ReportService) {}

  @Delete('delete/:id')
  async delete(
    @Res() response,
    @Param('id') id: string,
  ): Promise<ReportEntity> {
    try {
      const result = await this.reportService.remove(id);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'delete report successfully',
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
