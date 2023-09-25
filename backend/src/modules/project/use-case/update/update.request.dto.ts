import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly projectName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly language: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly startDate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly endDate: string;
}
