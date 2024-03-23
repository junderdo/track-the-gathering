import * as rolesDecorator from './roles.decorator';
import { Auth } from './auth.decorator';

describe('AuthDecorator', () => {
  it('should apply decorators related to authentication', () => {
    const rolesSpy = jest.spyOn(rolesDecorator, 'Roles');
    const mockRoles: rolesDecorator.AppRole[] = ['admin', 'standard'];
    Auth(mockRoles);
    expect(rolesSpy).toHaveBeenCalledWith(...mockRoles);
  });
});
