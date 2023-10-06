import {
  Controller,
  Put,
  Response,
  Param,
  Body,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { EmployeeService } from '../../service/employee.service';
import { UpdateEmployeeResponseDto } from './update.response.dto';
import { UpdateEmployeeRequestDto } from './update.request.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('employee')
@ApiTags('Employee')
export class UpdateController {
  constructor(private employeeService: EmployeeService) {}

  @Put('edit/:id')
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
  async updateEmployee(
    @Response() res,
    @Param('id') id: string,
    @Body() employee: UpdateEmployeeRequestDto,
    @UploadedFile()
    profile?: Express.Multer.File,
  ): Promise<UpdateEmployeeResponseDto> {
    try {
      const data = await this.employeeService.updateEmployeeByID(
        id,
        employee,
        profile,
      );
      return res
        .status(200)
        .json({ message: 'Employee Updated Successfullly', data });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
