import { Module } from '@nestjs/common';
import { MembersModule } from './members/members.module';
import { FixturesModule } from './fixtures/fixtures.module';
import { DrizzleModule } from './database/drizzle.module';

@Module({
  imports: [DrizzleModule, MembersModule, FixturesModule],
})
export class AppModule {}
