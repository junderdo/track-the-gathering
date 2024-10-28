import { User } from '@track-the-gathering/shared/users/data-access';
import { ResponseOneDto } from '@track-the-gathering/shared/dto';

export class UserGetOneResponseDto extends ResponseOneDto {
  data!: User;
}
