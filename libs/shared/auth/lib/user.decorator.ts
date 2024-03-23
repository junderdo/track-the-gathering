import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = AuthService.getPropFromJwt(
      'user',
      AuthService.getTokenFromRequest(request)
    );
    console.log('user', user);
    return user;
  }
);
