import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EUserRole } from 'src/user/user.model';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: EUserRole[], userRoles: EUserRole[]) {
    const rolesIntersection = roles.filter((role) => userRoles.includes(role));
    return rolesIntersection.length > 0;
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<EUserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.roles);
  }
}
