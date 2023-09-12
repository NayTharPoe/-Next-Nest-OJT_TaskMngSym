import { IsEmail, IsString } from 'class-validator';

export class UpdateEmployeeRequestDto {
  @IsString()
  employeeName: string;

  @IsEmail()
  email: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  DOB: string;

  @IsString()
  position: string;
}
