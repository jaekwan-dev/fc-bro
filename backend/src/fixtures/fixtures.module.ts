import { Module } from '@nestjs/common';
import { FixturesController } from './fixtures.controller';
import { FixturesService } from './fixtures.service';
import { FixturesSeedService } from './fixtures.seed';
import { DrizzleModule } from '../database/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [FixturesController],
  providers: [FixturesService, FixturesSeedService],
  exports: [FixturesService],
})
export class FixturesModule {}
