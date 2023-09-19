import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { ObjectId } from 'src/interfaces/objectId';
import { EUserRole } from '../enums/userRole.enum';

export class CreateUserResponse {
  @ApiProperty({ example: '6502c937dd99d1aeffc3f6e1' })
  id: ObjectId;
}

export class GetUserByIdResponse {
  @ApiProperty({
    description: "User's email",
    example: 'mykytazviahin@ukr.net',
  })
  email: string;

  @ApiProperty({
    description: "User's password",
    example: 'userpasswordexampleQNzsSadsa',
  })
  password: string;

  @ApiProperty({
    description: "User's roles",
    example: [[EUserRole.Creator, EUserRole.Customer]],
  })
  roles: EUserRole[];

  @ApiProperty({ description: "User's first name", example: 'Mykyta' })
  firstName: string;

  @ApiProperty({ description: "User's last name", example: 'Mykyta' })
  lastName: string;

  @ApiProperty({ description: "User's date of birth", example: '2000-03-22' })
  dateOfBirth: Date;

  @ApiProperty({ description: "User's club", example: 'OK Tisaren' })
  @IsOptional()
  club: string;
}
