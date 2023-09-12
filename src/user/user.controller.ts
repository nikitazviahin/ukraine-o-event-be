import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ObjectId } from 'src/interfaces/objectId';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.usersService.getUserById(id);

    return result;
  }
}
