import {
  Controller,
  Patch,
  Param,
  HttpStatus,
  Res,
  Body,
} from '@nestjs/common';
import { ReportService } from '../../services/report.service';
import { CreateReportRequestDto } from '../create/create.request.dto';
import { CreateReportResponseDto } from '../create/create.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('report')
@ApiTags('Report')
export class UpdateReportController {
  constructor(private readonly reportService: ReportService) {}

  @Patch('edit/:id')
  async update(
    @Res() response,
    @Param('id') id: string,
    @Body() updateReportDto: CreateReportRequestDto,
  ): Promise<CreateReportResponseDto> {
    try {
      const result = await this.reportService.update(id, updateReportDto);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'report update successfully',
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
