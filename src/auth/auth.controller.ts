import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request as ExpressRequest } from 'express';
import ILoginResponse from './interfaces/loginResponse.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest): Promise<ILoginResponse> {
    return this.authService.login(req.user);
  }
}
