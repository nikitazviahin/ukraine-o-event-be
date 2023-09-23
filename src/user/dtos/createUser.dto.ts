import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @ApiProperty({ description: "User's first name", example: 'Mykyta' })
  @IsString()
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ description: "User's last name", example: 'Mykyta' })
  @IsString()
  @MaxLength(50)
  lastName: string;

  @ApiProperty({ description: "User's date of birth", example: '2000-03-22' })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ description: "User's club", example: 'OK Tisaren' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  club: string;
}
