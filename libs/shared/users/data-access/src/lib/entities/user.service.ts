import { BaseEntityService } from '@track-the-gathering/shared/data-access';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseEntityService<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>
  ) {
    super(repository);
  }
}
