import {
  Controller,
  Response,
  Post,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { CreateEmployeeRequestDto } from './create.request.dto';
import { CreateEmployeeResponseDto } from './create.response.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee')
@ApiTags('Employee')
export class CreateController {
  constructor(private employeeService: EmployeeService) {}

  @Post('add')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        employeeName: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        profile: {
          type: 'string',
          format: 'binary',
        },
        address: {
          type: 'string',
        },
        phone: {
          type: 'string',
        },
        dob: {
          type: 'string',
        },
        position: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('profile'))
  async create(
    @Response() res,
    @Body() employee: CreateEmployeeRequestDto,
    @UploadedFile()
    profile?: Express.Multer.File,
  ): Promise<CreateEmployeeResponseDto> {
    try {
      const data = await this.employeeService.createEmployee(employee, profile);
      return res
        .status(200)
        .json({ message: 'Employee Created Successfully', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
