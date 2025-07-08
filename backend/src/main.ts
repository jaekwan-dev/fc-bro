import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MembersSeedService } from './members/members.seed';
import { FixturesSeedService } from './fixtures/fixtures.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fc-bro.vercel.app',
      'https://fc-bro-frontend.vercel.app',
      'https://fc-bro-git-main-fc-bro.vercel.app',
      'https://fc-bro-git-dev-fc-bro.vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: false, // Vercel과 Render 간 통신에서는 false로 설정
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // 전역 prefix 설정
  app.setGlobalPrefix('api');

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
