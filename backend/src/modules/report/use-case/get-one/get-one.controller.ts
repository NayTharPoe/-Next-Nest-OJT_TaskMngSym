import {
  Controller,
  Get,
  Param,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GetOneReportResponseDto } from './get-one.response.dto';
import { ReportService } from '../../services/report.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';

@Controller('report')
@ApiTags('Report')
export class GetDetailReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
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
