import { plainToInstance } from 'class-transformer';
import { UserCreateRequestDto } from './user-create.dto';

describe('UserCreateRequestDto', () => {
  it('should have props defined', () => {
    const value: UserCreateRequestDto = {
      name: 'mock-user-name',
      email: 'mock@email.com',
      pictureUrl: 'https://example.com/example.jpg',
      externalIdAuth: 'mock-external-id-auth',
    };

    const parsed = plainToInstance(UserCreateRequestDto, value);
    expect(parsed.name).toBe(value.name);
    expect(parsed.email).toBe(value.email);
    expect(parsed.pictureUrl).toBe(value.pictureUrl);
    expect(parsed.externalIdAuth).toBe(value.externalIdAuth);
  });
});
