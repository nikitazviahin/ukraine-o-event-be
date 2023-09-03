import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import ICreateUserResponse from './interfaces/createUserResponse.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ICreateUserResponse> {
    const result = await this.usersService.createUser(
      createUserDto.email,
      createUserDto.password,
    );
    return result;
  }
}
