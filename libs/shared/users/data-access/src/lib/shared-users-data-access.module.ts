import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  User,
  UserService,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  providers: [
    UserService,
  ],
  exports: [
    UserService,
  ],
})
export class SharedUsersDataAccessModule {}
