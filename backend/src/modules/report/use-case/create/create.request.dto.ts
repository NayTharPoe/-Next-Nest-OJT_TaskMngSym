import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class ReportByDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly employeeName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly profile: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly position: string;
}
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
  readonly hours: number;

  @ApiProperty({ type: ReportByDto })
  @IsNotEmpty()
  @IsObject()
  readonly reportBy: ReportByDto;

  @ApiProperty()
  problemFeeling: string;
}

export class CreateReportArrayRequestDto {
  @ApiProperty({ type: [CreateReportRequestDto] })
  readonly reports: CreateReportRequestDto[];
}
