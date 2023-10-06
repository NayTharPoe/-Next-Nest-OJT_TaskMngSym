import { Controller, Get, Param, Response } from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { GetOneEmployeeResponseDto } from './getOne.response.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('employee')
@ApiTags('Employee')
export class GetOneController {
  constructor(private employeeService: EmployeeService) {}

  @Get('detail/:id')
  async getById(
    @Response() res,
    @Param('id') id: string,
  ): Promise<GetOneEmployeeResponseDto> {
    const data = await this.employeeService.getEmployeeById(id);
    return res.status(200).json({ message: 'Get Employee By Id', data });
  }
}
