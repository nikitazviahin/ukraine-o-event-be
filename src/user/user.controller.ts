import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { ObjectId } from 'src/interfaces/objectId';
import { ParseObjectIdPipe } from 'src/pipes/parseObjectId.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  CreateUserResponse,
  GetUserByIdResponse,
} from './interfaces/userResponses';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Sign up new user' })
  @ApiOkResponse({ status: HttpStatus.CREATED, type: CreateUserResponse })
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: GetUserByIdResponse,
  })
  @ApiParam({ name: 'userId', type: String })
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getUserById(@Param('userId', ParseObjectIdPipe) id: ObjectId) {
    const result = await this.usersService.getUserById(id);

    return result;
  }
}
