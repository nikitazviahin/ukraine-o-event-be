import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LogInUserDto {
  @ApiProperty({
    description: "User's email",
    example: 'mykytazviahin@ukr.net',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "User's password",
    example: 'userpasswordexampleQNzsSadsa',
  })
  @IsString()
  password: string;
}
