import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateProjectRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly projectName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly language: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly endDate: string;
}