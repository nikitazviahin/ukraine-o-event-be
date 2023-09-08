import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import validateLogin from '../helpers/validateLogin';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    await validateLogin(context);

    return super.canActivate(context) as boolean | Promise<boolean>;
  }
}
