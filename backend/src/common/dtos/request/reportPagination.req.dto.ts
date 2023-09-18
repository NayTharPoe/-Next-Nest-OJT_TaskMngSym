import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationRequestDto } from './pagination.req.dto';

export class ReportPaginationRequestDto extends PaginationRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  reportTo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  reportBy?: string;
}
