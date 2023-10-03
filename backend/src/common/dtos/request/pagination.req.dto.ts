import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { paginate } from '../../constants/pagination';

const defaultPageNumber = paginate.DEFAULT_PAGE_NUMBER;
const defaultLimit = paginate.DEFAULT_LIMIT;

export class PaginationRequestDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @Transform((params) => params.value == null ?? Number(params.value))
  @IsOptional()
  page?: any = defaultPageNumber;

  @ApiProperty({ required: false })
  @IsNumber()
  @Transform((params) => params.value == null ?? Number(params.value))
  @IsOptional()
  limit?: any = defaultLimit;
}
