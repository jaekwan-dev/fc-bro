import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MembersSeedService } from './members.seed';
import { DrizzleModule } from '../database/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [MembersController],
  providers: [MembersService, MembersSeedService],
  exports: [MembersService],
})
export class MembersModule {}
