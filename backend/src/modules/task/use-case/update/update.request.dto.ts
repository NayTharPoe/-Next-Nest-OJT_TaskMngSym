import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskRequestDto {
  @IsString()
  project: string;

  @IsString()
  assignedEmployee: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  estimateHour: number;

  @IsString()
  @IsNotEmpty()
  actualHour: number;

  @IsString()
  status: string;

  // @IsString()
  estimate_start_date: string;

  // @IsString()
  estimate_finish_date: string;

  // @IsString()
  actual_start_date: string;

  // @IsString()
  actual_finish_date: string;
}
