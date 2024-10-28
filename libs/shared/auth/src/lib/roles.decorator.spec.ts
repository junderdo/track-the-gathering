import { AppRole, Roles } from './roles.decorator';

describe('Roles decorator', () => {
  it('should set metadata', () => {
    const mockRoles: AppRole[] = ['admin', 'standard'];
    const res = Roles(...mockRoles);
    console.log('Roles: ', res);

    //TODO assert that SetMetadata from @nestjs/common was called property
  });
});
