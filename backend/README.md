<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# FC-BRO Backend

FC-BRO의 NestJS 백엔드 서버입니다.

## 🛠 기술 스택

- **NestJS** - Node.js 프레임워크
- **TypeScript** - 타입 안전성
- **TypeORM** - ORM (Object-Relational Mapping)
- **Neon PostgreSQL** - 클라우드 데이터베이스
- **JWT** - 인증 (향후 구현 예정)

## 🚀 시작하기

### 1. 환경 변수 설정

`.env` 파일을 생성하고 다음 환경 변수를 설정하세요:

```bash
# Neon PostgreSQL Configuration
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require

# Environment
NODE_ENV=development

# Server Configuration
PORT=3001
```

### 2. Neon PostgreSQL 설정

#### Neon 계정 생성 및 데이터베이스 설정

1. [Neon Console](https://console.neon.tech)에서 계정 생성
2. 새 프로젝트 생성
3. 데이터베이스 생성
4. 연결 문자열 복사하여 `DATABASE_URL`에 설정

#### 로컬 개발 환경 (선택사항)

```bash
# PostgreSQL 설치 (Windows)
# https://www.postgresql.org/download/windows/

# 데이터베이스 생성
createdb fc_bro

# 환경 변수 설정
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=fc_bro
```

### 3. 의존성 설치 및 실행

```bash
npm install
npm run start:dev
```

## 📊 데이터베이스 스키마

### Members 테이블

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  birth_year INTEGER,
  age INTEGER NOT NULL,
  back_number INTEGER UNIQUE NOT NULL,
  main_position VARCHAR NOT NULL,
  sub_position TEXT[],
  main_level VARCHAR NOT NULL,
  sub_level INTEGER,
  preferred_foot VARCHAR,
  shoe_size INTEGER,
  football_boots VARCHAR,
  favorite_player VARCHAR,
  favorite_team VARCHAR,
  total_games INTEGER DEFAULT 0,
  attendance INTEGER DEFAULT 0,
  profile_url VARCHAR,
  injuries JSON,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run start:dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 테스트 실행
npm run test

# E2E 테스트 실행
npm run test:e2e
```

## 📡 API 엔드포인트

### 팀원 관리

- `GET /api/members` - 전체 팀원 목록
- `POST /api/members` - 새 팀원 등록
- `GET /api/members/:id` - 특정 팀원 조회
- `PATCH /api/members/:id` - 팀원 정보 수정
- `DELETE /api/members/:id` - 팀원 삭제

## 🔄 데이터 마이그레이션

TypeORM의 `synchronize: true` 옵션을 사용하여 자동으로 스키마를 동기화합니다.
**주의**: 프로덕션 환경에서는 `synchronize: false`로 설정하고 마이그레이션을 사용하세요.

## 🌱 시드 데이터

애플리케이션 시작 시 자동으로 샘플 데이터가 삽입됩니다.
데이터가 이미 존재하는 경우 시드는 건너뜁니다.

## 🚀 배포

### Vercel 배포 (권장)

1. GitHub 저장소 연결
2. 환경 변수 설정 (`DATABASE_URL`)
3. 빌드 명령어: `npm run build`
4. 시작 명령어: `npm run start`

### Render 배포

1. GitHub 저장소 연결
2. 환경 변수 설정 (`DATABASE_URL`)
3. 빌드 명령어: `npm run build`
4. 시작 명령어: `npm run start`

## 🌟 Neon PostgreSQL 장점

- **서버리스**: 자동 스케일링, 사용한 만큼만 과금
- **브랜치**: 개발/스테이징/프로덕션 환경 분리
- **자동 백업**: 7일간 자동 백업
- **글로벌 배포**: 전 세계 CDN
- **개발자 친화적**: 직관적인 대시보드

## 📝 주의사항

- 개발 환경에서만 `synchronize: true` 사용
- 프로덕션에서는 마이그레이션 사용 권장
- 환경 변수는 절대 Git에 커밋하지 마세요
- Neon 연결 문자열에 SSL 모드 포함 (`?sslmode=require`)
