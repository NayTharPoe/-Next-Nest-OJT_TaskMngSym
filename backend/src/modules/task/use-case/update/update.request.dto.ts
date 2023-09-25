import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskRequestDto {
  @ApiProperty()
  project: string;

  @ApiProperty()
  assignedEmployee: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  estimateHour: number;

  @ApiProperty()
  actualHour: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  estimate_start_date: string;

  @ApiProperty()
  estimate_finish_date: string;

  @ApiProperty()
  actual_start_date: string;

  @ApiProperty()
  actual_finish_date: string;
}
