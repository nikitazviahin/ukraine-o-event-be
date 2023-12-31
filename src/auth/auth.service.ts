import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException();

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (user && isPasswordValid) return user;

    return null;
  }

  async login(user: any) {
    const { email, id, roles } = user;
    const payload = { email, id, roles };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}
