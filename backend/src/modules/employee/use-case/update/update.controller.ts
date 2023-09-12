import { Controller, Put, Response, Param, Body } from '@nestjs/common';
import { EmployeeService } from '../../employee.service';
import { UpdateEmployeeResponseDto } from './update.response.dto';
import { UpdateEmployeeRequestDto } from './update.request.dto';

@Controller('employee')
export class UpdateController {
  constructor(private employeeService: EmployeeService) {}

  @Put('edit/:id')
  async updateEmployee(
    @Response() res,
    @Param('id') id: string,
    @Body() employee: UpdateEmployeeRequestDto,
  ): Promise<UpdateEmployeeResponseDto> {
    const data = await this.employeeService.updateEmployeeByID(id, employee);
    return res
      .status(200)
      .json({ message: 'Employee Updated Successfullly', data });
  }
}
