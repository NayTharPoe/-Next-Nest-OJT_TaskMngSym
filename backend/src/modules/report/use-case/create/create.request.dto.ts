import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly reportTo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly taskId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly taskTitle: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly project: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly percentage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly types: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly status: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  readonly hour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly reportBy: string;

  @ApiProperty()
  problemFeeling: string;
}

export class CreateReportArrayRequestDto {
  @ApiProperty({ type: [CreateReportRequestDto] })
  readonly reports: CreateReportRequestDto[];
}
