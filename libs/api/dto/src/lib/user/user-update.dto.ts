import { User } from '@track-the-gathering/shared/users/data-access';
import { ResponseOneDto } from '@track-the-gathering/shared/dto';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UserUpdateRequestDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsUrl()
  @IsOptional()
  pictureUrl?: string;
}

export class UserUpdateResponseDto extends ResponseOneDto {
  data!: User;
}
