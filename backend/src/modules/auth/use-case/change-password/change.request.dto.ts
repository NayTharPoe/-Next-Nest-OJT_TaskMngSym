import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeRequestDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  confirmPassword: string;
}
