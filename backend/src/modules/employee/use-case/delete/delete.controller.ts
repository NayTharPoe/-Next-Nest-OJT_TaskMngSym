import { Controller, Response, Param, Delete } from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';

@Controller('employee')
export class DeleteController {
  constructor(private employeeService: EmployeeService) {}
  @Delete(':id')
  async delEmployee(@Response() res, @Param('id') id: string) {
    await this.employeeService.dropEmployee(id);
    return res.status(200).json({ message: 'Employee Deleted Successfully' });
  }
}
