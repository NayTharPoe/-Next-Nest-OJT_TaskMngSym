import { Controller, Get, Response } from '@nestjs/common';
import { EmployeeService } from '../../employee.service';
import { GetAllEmployeeResponseDto } from './getAll.response.dto';

@Controller('employee')
export class GetAllController {
  constructor(private employeeService: EmployeeService) {}

  @Get('list')
  async getEmployee(@Response() res): Promise<GetAllEmployeeResponseDto> {
    const data = await this.employeeService.getAllEmployee();
    return res.status(200).json({ message: 'Get All Employee List', data });
  }
}
