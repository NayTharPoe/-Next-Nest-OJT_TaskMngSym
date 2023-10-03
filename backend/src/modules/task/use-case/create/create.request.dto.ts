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

  // @IsNumber()
  // @ApiProperty()
  // @IsNotEmpty()
  // actualHour: number;

  // @IsString()
  // @ApiProperty()
  // @IsNotEmpty()
  // status: string;

  @ApiProperty()
  estimate_start_date: string;

  @ApiProperty()
  estimate_finish_date: string;

  // @ApiProperty()
  // actual_start_date: string;

  // @ApiProperty()
  // actual_finish_date: string;
}
