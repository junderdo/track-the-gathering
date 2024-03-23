import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ManagementService } from './management.service';

@Module({
  controllers: [],
  providers: [AuthGuard, AuthService, ManagementService],
  exports: [AuthGuard, AuthService, ManagementService],
})
export class SharedAuthModule {}
