import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import ICreateUserResponse from './interfaces/createUserResponse.interface';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

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
