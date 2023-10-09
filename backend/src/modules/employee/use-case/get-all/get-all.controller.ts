import { Controller, Get, Response, Query } from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { GetAllEmployeeResponseDto } from './getAll.response.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { EmployeePaginationRequestDto } from 'src/common/dtos/request/employeePagination.req.dto';

@Controller('employees')
@ApiTags('Employee')
export class GetAllController {
  constructor(private employeeService: EmployeeService) {}

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
    required: false,
    type: String,
    description: 'Search by employeeName and position',
  })
  async getEmployee(
    @Response() res,
    @Query() query: EmployeePaginationRequestDto,
  ): Promise<GetAllEmployeeResponseDto> {
    const { data, totalEmployee } =
      await this.employeeService.getAllEmployee(query);
    return res
      .status(200)
      .json({ message: 'Get All Employee List', data, totalEmployee });
  }
}
