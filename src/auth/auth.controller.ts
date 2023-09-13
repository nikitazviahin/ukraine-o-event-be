import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IGetUserAuthInfoRequest } from 'src/interfaces/requestUserInfo.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ILoginResponse } from './interfaces/loginResponse.interface';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { LogInUserDto } from './dtos/loginUser.dto';
import { EUserRole } from 'src/user/enums/userRole.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Log in user' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({
    status: 200,
    description: 'Login success',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(
    @Body() _: LogInUserDto, //dto for custom validation purposes
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<ILoginResponse> {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Get user's profile" })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({
    status: 200,
    description: 'Get user profile success',
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: IGetUserAuthInfoRequest) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Test admin role endpoint' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'Test admin role endpoint success',
  })
  @Roles(EUserRole.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('admintest')
  getAdminTest() {
    return { message: 'endpoint for admin' };
  }

  @ApiOperation({ summary: 'Test creator role endpoint' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiResponse({ status: 401, description: 'Unathorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
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
