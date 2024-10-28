import { User } from '@track-the-gathering/shared/users/data-access';
import { ResponseOneDto } from '@track-the-gathering/shared/dto';
import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UserCreateRequestDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsUrl()
  pictureUrl!: string;

  @IsString()
  @IsOptional()
  externalIdAuth?: string;
}

export class UserCreateResponseDto extends ResponseOneDto {
  data!: User;
}
