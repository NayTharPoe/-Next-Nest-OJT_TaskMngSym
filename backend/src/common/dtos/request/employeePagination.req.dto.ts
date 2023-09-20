import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequestDto } from './pagination.req.dto';

export class EmployeePaginationRequestDto extends PaginationRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  keyword?: string;
}
