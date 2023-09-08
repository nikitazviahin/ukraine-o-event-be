import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IGetUserAuthInfoRequest } from 'src/interfaces/requestUserInfo.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ILoginResponse } from './interfaces/loginResponse.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { LogInUserDto } from './dtos/loginUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() _: LogInUserDto, //dto for custom validation purposes
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<ILoginResponse> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: IGetUserAuthInfoRequest) {
    return req.user;
  }

  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('admintest')
  getAdminTest() {
    return { message: 'endpoint for admin' };
  }

  @ApiBearerAuth()
  @Roles('creator')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('creatortest')
  getCreatorTest() {
    return { message: 'endpoint for creator' };
  }
}
