import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { ReportService } from '../../services/report.service';
import { GetAllReportResponseDto } from './get-all.response.dto';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.req.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@Controller('reports')
@ApiTags('Report')
export class GetAllReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/list')
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({ name: 'page', type: Number, description: 'Page number' })
  @ApiQuery({
    name: 'date',
    type: String,
    description: 'Report date in YYYY-MM-DD format',
    required: false,
  })
  @ApiQuery({
    name: 'reportTo',
    type: String,
    description: 'Report recipient name',
    required: false,
  })
  @ApiQuery({
    name: 'reportBy',
    type: String,
    description: 'Report creator name',
    required: false,
  })
  async findAll(
    @Res() response,
    @Query() query: PaginationRequestDto,
  ): Promise<GetAllReportResponseDto[]> {
    try {
      const result = await this.reportService.findAll(query);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Retrieve all report successfully',
        data: result.reports,
        count: result.totalReports,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error?.status,
        message: error.response?.message,
      });
    }
  }
}
