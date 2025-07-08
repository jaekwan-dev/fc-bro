import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MembersSeedService } from './members/members.seed';
import { FixturesSeedService } from './fixtures/fixtures.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: true, // 모든 origin 허용 (개발 중)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 시드 데이터 삽입
  const membersSeedService = app.get(MembersSeedService);
  const fixturesSeedService = app.get(FixturesSeedService);

  await membersSeedService.seed();
  await fixturesSeedService.seed();

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
