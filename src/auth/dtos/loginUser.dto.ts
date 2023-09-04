import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LogInUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
