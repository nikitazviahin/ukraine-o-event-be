import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import ILoginResponse from './interfaces/loginResponse.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LogInUserDto } from './dtos/loginUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginUserDto: LogInUserDto,
    @Request() req: ExpressRequest,
  ): Promise<ILoginResponse> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiTags('auth')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('admintest')
  getAdminTest(@Request() req: ExpressRequest) {
    return { message: 'endpoint for admin' };
  }
}
