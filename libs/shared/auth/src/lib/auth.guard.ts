import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AppRole, DECORATOR_KEY_ROLES } from './roles.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<AppRole[]>(
      DECORATOR_KEY_ROLES,
      context.getHandler()
    );

    const token = AuthService.getTokenFromRequest(request);
    await AuthService.verifyJWT(token);
    AuthService.verifyRoles(roles, token);

    return true;
  }
}
