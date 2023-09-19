import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IGetUserAuthInfoRequest } from 'src/interfaces/requestUserInfo.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { LogInUserDto } from './dtos/loginUser.dto';
import { EUserRole } from 'src/user/enums/userRole.enum';
import { GetProfileResponse, LoginResponse } from './interfaces/authResponses';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log in user' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Login success',
    type: LoginResponse,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() _: LogInUserDto, //dto for custom validation purposes
    @Request() req: IGetUserAuthInfoRequest,
  ) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's profile" })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Get user profile success',
    type: GetProfileResponse,
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: IGetUserAuthInfoRequest) {
    return req.user;
  }

  @ApiOperation({ summary: 'Test creator role endpoint' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Test creator role endpoint success',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(EUserRole.Creator)
  @Get('creatortest')
  getCreatorTest() {
    return { message: 'endpoint for creator' };
  }
}
