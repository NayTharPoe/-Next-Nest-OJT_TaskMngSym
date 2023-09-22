import { Controller, Get, Response, UseGuards, Query } from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { GetAllEmployeeResponseDto } from './getAll.response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PaginationRequestDto } from 'src/common/dtos/request/pagination.request.dto';

@Controller('employees')
@ApiTags('Employee')
export class GetAllController {
  constructor(private employeeService: EmployeeService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('list')
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page Number',
  })
  @ApiQuery({
    name: 'keyword',
    type: String,
    description: 'Search by employeeName and position',
  })
  async getEmployee(
    @Response() res,
    @Query() query: PaginationRequestDto,
  ): Promise<GetAllEmployeeResponseDto> {
    const { data, totalEmployee } =
      await this.employeeService.getAllEmployee(query);
    return res
      .status(200)
      .json({ message: 'Get All Employee List', data, totalEmployee });
  }
}
