import {
  Controller,
  Response,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('employee')
@ApiTags('Employee')
export class DeleteController {
  constructor(private employeeService: EmployeeService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Delete(':id')
  async delEmployee(@Response() res, @Param('id') id: string) {
    try {
      await this.employeeService.dropEmployee(id);
      return res.status(200).json({ message: 'Employee Deleted Successfully' });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
