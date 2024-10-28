import { User } from '@track-the-gathering/shared/users/data-access';
import { RequestManyDto, ResponseManyDto } from '@track-the-gathering/shared/dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserGetRequestDto extends RequestManyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}

export class UserGetResponseDto extends ResponseManyDto {
  data!: User[];
}
