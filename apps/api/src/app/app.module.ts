import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedNestjsAppConfigModule } from '@track-the-gathering/nestjs-app-config';

@Module({
  imports: [
    SharedNestjsAppConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
