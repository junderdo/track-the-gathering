import { User } from './user.decorator';
describe('UserDecorator', () => {
  it('should add user data parsed from token', () => {
    const userDecoratorFunction = User();
    expect(userDecoratorFunction).toBeTruthy();
  });
});
