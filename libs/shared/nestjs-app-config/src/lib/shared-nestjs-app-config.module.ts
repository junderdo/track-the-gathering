import { Module } from '@nestjs/common';
import { AppLogger } from './logger.config';

@Module({
  controllers: [],
  providers: [AppLogger],
  exports: [AppLogger],
})
export class SharedNestjsAppConfigModule {}
