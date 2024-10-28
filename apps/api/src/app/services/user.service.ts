import { Injectable } from '@nestjs/common';
import { UserGetRequestDto } from '@track-the-gathering/api/dto';
import { User, UserService } from '@track-the-gathering/shared/users/data-access';

@Injectable()
export class AppUserService {
  constructor(
    private service: UserService
  ) { }

  async getUsers(query: UserGetRequestDto): Promise<User[]> {
    return await this.service.find(query);
  }
}