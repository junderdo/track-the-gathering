import { BaseEntity } from '@track-the-gathering/shared/data-access';
import { User } from './user.entity';

describe('User entity', () => {
  it('should extend BaseEntity and have additional properties', () => {
    const res = new User({
      name: 'mock-user-name',
      email: 'mock@email.com',
      pictureUrl: 'mock-picture-url',
    });

    expect(res).toBeInstanceOf(BaseEntity);
    expect(res.name).toBe('mock-user-name');
    expect(res.email).toBe('mock@email.com');
    expect(res.pictureUrl).toBe('mock-picture-url');
  });
});
