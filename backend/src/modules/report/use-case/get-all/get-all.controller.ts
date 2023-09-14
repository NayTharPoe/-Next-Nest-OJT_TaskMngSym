import { Controller, Get, Res, HttpStatus, Query } from '@nestjs/common';
import { ReportService } from '../../services/report.service';
import { GetAllReportResponseDto } from './get-all.response.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
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
  async findAll(
    @Res() response,
    @Query() query: ExpressQuery,
  ): Promise<GetAllReportResponseDto[]> {
    try {
      const result = await this.reportService.findAll(query);
      return response.status(HttpStatus.OK).json({
        statusCode: 200,
        message: 'Retrieve all report successfully',
        data: result,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: error.status,
        message: error.response.message,
      });
    }
  }
}
