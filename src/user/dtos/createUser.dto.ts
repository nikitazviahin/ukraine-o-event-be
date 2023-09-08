import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({description: 'User\'s email', example: 'mykytazviahin@ukr.net'})
  @IsEmail()
  email: string;

  @ApiProperty({description: 'User\'s password', example: 'userpasswordexampleQNzsSadsa'})
  @IsString()
  password: string;

  @ApiProperty({description: 'User\'s first name', example: 'Mykyta'})
  @IsString()
  firstName: string;

  @ApiProperty({description: 'User\'s last name', example: 'Mykyta'})
  @IsString()
  lastName: string;

  @ApiProperty({description: 'User\'s date of birth', example: '2000-03-22'})
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({description: 'User\'s club', example: 'OK Tisaren'})
  @IsOptional()
  @IsString()
  club: string;

  @ApiProperty({description: 'User\'s SportIdent number', example: 8025558})
  @IsOptional()
  @IsNumber()
  si: number;
}
