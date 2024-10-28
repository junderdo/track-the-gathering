import { SetMetadata } from '@nestjs/common';

//TODO move roles to data / get from Auth0?
//TODO add and/or convert to using ABAC?
//TODO uncomment POST endpoints and add more security
//TODO custom roles / attributes?
export type AppRole = 'admin' | 'standard' | 'guest';
export const DECORATOR_KEY_ROLES = Symbol('roles');
export const Roles = (...roles: AppRole[]) =>
  SetMetadata(DECORATOR_KEY_ROLES, roles);
