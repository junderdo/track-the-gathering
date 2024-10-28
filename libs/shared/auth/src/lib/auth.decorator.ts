import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AppRole, Roles } from './roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

//TODO add response codes to swagger documentation in this config
export const Auth = (roles: AppRole[]) => {
  return applyDecorators(
    UseGuards(AuthGuard),
    Roles(...roles),
    ApiBearerAuth()
  );
};
