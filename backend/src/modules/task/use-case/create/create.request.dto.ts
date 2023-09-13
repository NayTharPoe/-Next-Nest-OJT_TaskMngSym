import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskRequestDto {
  @IsNotEmpty()
  @IsString()
  project: string;

  @IsNotEmpty()
  @IsString()
  assignedEmployee: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  estimateHour: number;

  @IsString()
  @IsNotEmpty()
  actualHour: number;

  @IsString()
  @IsNotEmpty()
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
