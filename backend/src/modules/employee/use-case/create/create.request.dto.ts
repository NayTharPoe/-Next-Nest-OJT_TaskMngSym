import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateEmployeeRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  employeeName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  profile: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  dob: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  position: string;
}
