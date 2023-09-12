import { Controller, Response, Param, Delete } from '@nestjs/common';
import { EmployeeService } from '../../employee.service';
import { DeleteEmployeeResponseDto } from './delete.response.dto';

@Controller('employee')
export class DeleteController {
  constructor(private employeeService: EmployeeService) {}
  @Delete(':id')
  async delEmployee(
    @Response() res,
    @Param('id') id: string,
  ): Promise<DeleteEmployeeResponseDto> {
    await this.employeeService.dropEmployee(id);
    return res.status(200).json({ message: 'Employee Deleted Successfully' });
  }
}
