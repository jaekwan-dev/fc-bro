# FC-BRO 풀스택 애플리케이션

NestJS 백엔드와 Next.js 프론트엔드로 구성된 풀스택 애플리케이션입니다.

## 프로젝트 구조

```
fc-bro/
├── backend/          # NestJS 백엔드
├── frontend/         # Next.js 프론트엔드 (ShadCN + Tailwind CSS)
├── package.json      # 루트 패키지 설정
├── vercel.json       # Vercel 배포 설정
└── render.yaml       # Render 배포 설정
```

## 기술 스택

### 백엔드 (NestJS)
- **Framework**: NestJS
- **Language**: TypeScript
- **배포**: Render

### 프론트엔드 (Next.js)
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI
- **배포**: Vercel

## 개발 환경 설정

### 1. 의존성 설치

```bash
# 루트 및 모든 서브프로젝트 의존성 설치
npm run install:all
```

### 2. 환경 변수 설정

#### 프론트엔드 (.env.local)
```bash
# frontend/.env.local 파일 생성
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### 백엔드 (.env)
```bash
# backend/.env 파일 생성
NODE_ENV=development
PORT=3001
```

### 3. 개발 서버 실행

```bash
# 백엔드와 프론트엔드 동시 실행
npm run dev

# 개별 실행
npm run dev:backend    # 백엔드만 실행 (포트 3001)
npm run dev:frontend   # 프론트엔드만 실행 (포트 3000)
```

## 빌드 및 배포

### 로컬 빌드
```bash
npm run build
```

### 배포

#### 프론트엔드 (Vercel)
1. Vercel에 GitHub 저장소 연결
2. 프로젝트 루트 디렉토리 설정
3. 환경 변수 `NEXT_PUBLIC_API_URL` 설정
4. 자동 배포 활성화

#### 백엔드 (Render)
1. Render에 GitHub 저장소 연결
2. `render.yaml` 설정 파일 사용
3. 환경 변수 설정 (NODE_ENV, PORT 등)
4. 자동 배포 활성화

## 사용 가능한 스크립트

```bash
npm run dev              # 백엔드 + 프론트엔드 동시 실행
npm run dev:backend      # 백엔드만 실행
npm run dev:frontend     # 프론트엔드만 실행
npm run build            # 전체 빌드
npm run build:backend    # 백엔드 빌드
npm run build:frontend   # 프론트엔드 빌드
npm run install:all      # 모든 의존성 설치
npm run clean           # 빌드 파일 정리
```

## ShadCN 컴포넌트 사용

이미 설치된 컴포넌트:
- Button
- Card
- Input
- Textarea
- Label

추가 컴포넌트 설치:
```bash
cd frontend
npx shadcn@latest add [component-name]
```

## 라이센스

MIT 