import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  project: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  assignedEmployee: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  description: string;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  estimateHour: number;

  @ApiProperty()
  @IsNotEmpty()
  estimate_start_date: string;

  @ApiProperty()
  @IsNotEmpty()
  estimate_finish_date: string;
}
