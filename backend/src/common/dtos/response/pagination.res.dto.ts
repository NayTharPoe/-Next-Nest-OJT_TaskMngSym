import { ApiProperty } from '@nestjs/swagger';

export class PaginationMetaData {
  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  count: number;
}

export class PaginationResponse<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  metadata: PaginationMetaData;

  constructor(data: PaginationResponse<T>) {
    Object.assign(this, data);
  }
}