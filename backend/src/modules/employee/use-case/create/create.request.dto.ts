import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateEmployeeRequestDto {
  @IsNotEmpty()
  @IsString()
  employeeName: string;

  @IsEmail()
  @IsNotEmpty()
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
