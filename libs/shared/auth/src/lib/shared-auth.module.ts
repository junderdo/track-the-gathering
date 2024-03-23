import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  controllers: [],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class SharedAuthModule {}
