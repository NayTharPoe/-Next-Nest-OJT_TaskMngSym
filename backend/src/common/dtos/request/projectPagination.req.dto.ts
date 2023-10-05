import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequestDto } from './pagination.req.dto';

export class ProjectPaginationRequestDto extends PaginationRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  search?: string;
}
