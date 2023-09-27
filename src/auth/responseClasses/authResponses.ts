import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'src/interfaces/objectId';
import { EUserRole } from 'src/user/user.model';

export class LoginResponse {
  @ApiProperty({
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15a3l0YXp2aWFoaW5AdGVzdC5jb20iLCJpZCI6IjY1MDJjOTM3ZGQ5OWQxYWVmZmMzZjZlMSIsInJvbGVzIjpbImN1c3RvbWVyIiwiY3JlYXRvciJdLCJpYXQiOjE2OTUxMTg5NTJ9.GB_LIs66fSR7v5K5ibW85n2Ebf0oxWJmvUAxinZd5PQ',
  })
  access_token: string;
}

export class GetProfileResponse {
  @ApiProperty({ example: '6502c937dd99d1aeffc3f6e1' })
  id: ObjectId;

  @ApiProperty({
    description: "User's email",
    example: 'mykytazviahin@ukr.net',
  })
  email: string;

  @ApiProperty({
    description: "User's roles",
    example: [EUserRole.Creator, EUserRole.Customer],
  })
  roles: EUserRole[];

  @ApiProperty({
    description: 'Issued time of a token',
    example: 1694685686,
  })
  iat: number;

  @ApiProperty({
    description: 'expiration time of a token',
    example: 1694685687,
  })
  exp: number;
}
