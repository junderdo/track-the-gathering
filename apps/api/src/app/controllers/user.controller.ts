import { Controller, Get, Query } from '@nestjs/common';
import { GetMany } from '@track-the-gathering/shared/dto';
import { AppUserService } from '../services/user.service';
import { User } from '@track-the-gathering/shared/users/data-access';
import { UserGetRequestDto, UserGetResponseDto } from '@track-the-gathering/api/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly service: AppUserService) {}

  // @Auth([AppPermission.USER_READ])
  @Get()
  @GetMany(UserGetResponseDto)
  async getUsers(@Query() query: UserGetRequestDto): Promise<User[]> {
    // this.logger.log(`Getting users: ${JSON.stringify(query)}`);
    return this.service.getUsers(query);
  }
}