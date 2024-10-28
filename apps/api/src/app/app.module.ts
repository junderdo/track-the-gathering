import { Module } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { SharedNestjsAppConfigModule } from '@track-the-gathering/shared/nestjs-app-config';

import { AppUserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { SharedUsersDataAccessModule } from '@track-the-gathering/shared/users/data-access';
import { SharedNestjsDatasourcePgModule } from '@track-the-gathering/shared/nestjs-datasource-pg';

@Module({
  imports: [
    SharedNestjsAppConfigModule,
    SharedNestjsDatasourcePgModule,
    SharedUsersDataAccessModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, AppUserService],
})
export class AppModule {}
