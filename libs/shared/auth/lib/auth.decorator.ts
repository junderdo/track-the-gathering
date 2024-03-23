import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AppRole, Roles } from './roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

export const Auth = (roles: AppRole[]) => {
  return applyDecorators(
    UseGuards(AuthGuard),
    Roles(...roles),
    ApiBearerAuth()
  );
};
