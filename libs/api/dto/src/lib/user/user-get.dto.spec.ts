import { plainToInstance } from 'class-transformer';
import { ResponseLinks, ResponseMeta } from '@track-the-gathering/shared/dto';
import { UserGetRequestDto, UserGetResponseDto } from './user-get.dto';
import { User } from '@track-the-gathering/shared/users/data-access';

describe('UserGetDtos', () => {
  describe('UserGetRequestDto', () => {
    it('should have props defined', () => {
      const value: UserGetRequestDto = {
        name: 'mock-user-name',
        email: 'mock@email.com',
      };

      const parsed = plainToInstance(UserGetRequestDto, value);
      expect(parsed.name).toEqual(value.name);
      expect(parsed.email).toEqual(value.email);
    });
  });

  describe('UserGetResponseDto', () => {
    it('should have props defined', () => {
      const value: UserGetResponseDto = {
        data: [new User()],
        meta: new ResponseMeta(),
        links: new ResponseLinks(),
      };

      const parsed = plainToInstance(UserGetResponseDto, value);
      expect(parsed.data).toEqual(value.data);
      expect(parsed.meta).toEqual(value.meta);
      expect(parsed.links).toEqual(value.links);
    });
  });
});
