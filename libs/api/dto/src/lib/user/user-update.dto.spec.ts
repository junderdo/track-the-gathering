import { plainToInstance } from 'class-transformer';
import { UserUpdateRequestDto, UserUpdateResponseDto } from './user-update.dto';
import { ResponseMeta, ResponseLinks } from '@track-the-gathering/shared/dto';
import { User } from '@track-the-gathering/shared/users/data-access';

describe('UserUpdateDtos', () => {
  describe('UserUpdateRequestDto', () => {
    it('should have props defined', () => {
      const value: UserUpdateRequestDto = {
        name: 'mock-user-name-updated',
        pictureUrl: 'mock-picture-url-updated',
      };

      const parsed = plainToInstance(UserUpdateRequestDto, value);
      expect(parsed.name).toBe(value.name);
      expect(parsed.pictureUrl).toBe(value.pictureUrl);
    });
  });

  describe('UserUpdateResponseDto', () => {
    it('should have props defined', () => {
      const value: UserUpdateResponseDto = {
        data: new User(),
        meta: new ResponseMeta(),
        links: new ResponseLinks(),
      };

      const parsed = plainToInstance(UserUpdateResponseDto, value);
      expect(parsed.data).toEqual(value.data);
      expect(parsed.meta).toEqual(value.meta);
      expect(parsed.links).toEqual(value.links);
    });
  });
});
