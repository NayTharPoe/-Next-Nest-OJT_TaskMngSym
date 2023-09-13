import {
  Controller,
  Response,
  Post,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { CreateEmployeeRequestDto } from './create.request.dto';
import { CreateEmployeeResponseDto } from './create.response.dto';

@Controller('employee')
export class CreateController {
  constructor(private employeeService: EmployeeService) {}

  @Post('add')
  async create(
    @Response() res,
    @Body() employee: CreateEmployeeRequestDto,
  ): Promise<CreateEmployeeResponseDto> {
    try {
      const data = await this.employeeService.createEmployee(employee);
      return res
        .status(200)
        .json({ message: 'Employee Created Successfully', data });
    } catch (err) {
      console.log(err);
      throw new NotFoundException(err.message);
    }
  }
}
