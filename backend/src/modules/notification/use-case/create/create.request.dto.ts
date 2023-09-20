import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly tag: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly createdByWhom: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly profile: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly read: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly sendTo: string;
}
