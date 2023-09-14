import { Controller, Get, Response, UseGuards } from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { GetAllEmployeeResponseDto } from './getAll.response.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('employees')
@ApiTags('Employee')
export class GetAllController {
  constructor(private employeeService: EmployeeService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard)
  @Get('list')
  async getEmployee(@Response() res): Promise<GetAllEmployeeResponseDto> {
    const data = await this.employeeService.getAllEmployee();
    return res.status(200).json({ message: 'Get All Employee List', data });
  }
}
