import { plainToInstance } from 'class-transformer';
import { User } from '@track-the-gathering/shared/users/data-access';
import { ResponseLinks, ResponseMeta } from '@track-the-gathering/shared/dto';
import { UserGetOneResponseDto } from './user-get-one.dto';

describe('UserGetOneResponseDto', () => {
  it('should have props defined', () => {
    const value: UserGetOneResponseDto = {
      data: new User(),
      meta: new ResponseMeta(),
      links: new ResponseLinks(),
    };

    const parsed = plainToInstance(UserGetOneResponseDto, value);
    expect(parsed.data).toEqual(value.data);
    expect(parsed.meta).toEqual(value.meta);
    expect(parsed.links).toEqual(value.links);
  });
});
