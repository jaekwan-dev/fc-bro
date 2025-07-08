# Neon PostgreSQL 설정 가이드

## 🚀 Neon PostgreSQL 설정 단계

### 1. Neon 계정 생성

1. [Neon Console](https://console.neon.tech) 방문
2. GitHub 계정으로 로그인
3. 새 프로젝트 생성

### 2. 데이터베이스 생성

1. 프로젝트 대시보드에서 "Create Database" 클릭
2. 데이터베이스 이름: `fc-bro`
3. 소유자: 기본 사용자 또는 새 사용자 생성

### 3. 연결 문자열 복사

1. 프로젝트 대시보드에서 "Connection Details" 클릭
2. "Connection string" 섹션에서 연결 문자열 복사
3. 형식: `postgresql://username:password@host:port/database?sslmode=require`

### 4. 환경 변수 설정

`.env` 파일에 연결 문자열 추가:

```bash
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
NODE_ENV=development
PORT=3001
```

### 5. 애플리케이션 실행

```bash
npm install
npm run start:dev
```

## 🔧 Neon 특화 기능

### 브랜치 생성 (개발/스테이징 환경)

1. 프로젝트 대시보드에서 "Branches" 클릭
2. "Create Branch" 클릭
3. 브랜치 이름 설정 (예: `development`, `staging`)
4. 각 브랜치별로 다른 연결 문자열 사용

### 자동 백업

- Neon은 7일간 자동 백업 제공
- 필요시 수동 백업도 가능

### 모니터링

- Neon 대시보드에서 쿼리 성능 모니터링
- 연결 수, 쿼리 수 등 실시간 통계 확인

## 🚨 주의사항

1. **SSL 연결**: Neon은 SSL 연결을 필수로 요구
2. **연결 제한**: 무료 플랜은 동시 연결 수 제한
3. **데이터 보존**: 7일간 자동 백업, 그 이후 삭제
4. **지역 선택**: 사용자와 가까운 지역 선택 권장

## 🔗 유용한 링크

- [Neon Documentation](https://neon.tech/docs)
- [Neon Console](https://console.neon.tech)
- [Connection String Guide](https://neon.tech/docs/connect/connection-string)
- [SSL Configuration](https://neon.tech/docs/connect/ssl)
