import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiTags('users')
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      dateOfBirth: createUserDto.dateOfBirth,
      club: createUserDto.club,
      si: createUserDto.si,
    });
    return result;
  }
}
