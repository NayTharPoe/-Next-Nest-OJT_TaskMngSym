import { IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotificationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  readonly read: string[];
}
