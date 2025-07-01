# FC-BRO

FC-BRO는 아마추어 축구팀을 위한 총무 관리 서비스입니다.

## 📋 주요 기능

### ✅ 완성된 기능 (MVP)
- **팀원 관리**: 팀원 등록, 수정, 삭제, 상세 정보 조회
- **프로필 관리**: 이름, 나이, 백넘버, 포지션(주/부), 레벨(1-5)
- **출석률 관리**: 경기수 대비 출석 횟수 추적
- **검색 및 필터**: 이름/포지션 검색, 포지션별 필터링
- **모바일 우선 UI**: 반응형 웹, 카드형 UI, 프리미어리그 앱 스타일

### 🚀 향후 개발 예정
- 경기 일정 관리
- 경기별 출석 체크
- 자동 팀 배정 (노랑팀/파랑팀)
- 출석률 통계 대시보드

## 🛠 기술 스택

### Backend
- **NestJS** - Node.js 프레임워크
- **TypeScript** - 타입 안전성
- **메모리 저장소** - 간단한 데이터 관리

### Frontend  
- **Next.js 15** - React 프레임워크
- **TypeScript** - 타입 안전성
- **TailwindCSS** - 스타일링
- **ShadCN UI** - UI 컴포넌트
- **모바일 퍼스트** - 반응형 디자인

## 🚀 배포

- **Frontend**: [Vercel](https://fc-bro-frontend.vercel.app)
- **Backend**: [Render](https://fc-bro-backend.onrender.com)

## ⚙️ 개발 환경 설정

### 1. 저장소 클론
```bash
git clone https://github.com/jaekwan-dev/fc-bro.git
cd fc-bro
```

### 2. 백엔드 설정 및 실행
```bash
cd backend
npm install
npm run start:dev  # http://localhost:3001
```

### 3. 프론트엔드 설정 및 실행
```bash
cd frontend
npm install
npm run dev  # http://localhost:3000
```

## 📱 사용법

1. **팀원 추가**: 메인 화면에서 "+" 버튼으로 새 팀원 등록
2. **팀원 관리**: 팀원 카드 클릭으로 상세 정보 확인/수정/삭제
3. **검색**: 이름 또는 포지션으로 팀원 검색
4. **필터링**: 포지션별 필터로 팀원 분류

## 🏗 프로젝트 구조

```
fc-bro/
├── backend/          # NestJS 백엔드
│   ├── src/
│   │   ├── members/  # 팀원 관리 모듈
│   │   └── ...
│   └── package.json
├── frontend/         # Next.js 프론트엔드
│   ├── src/
│   │   ├── app/      # 페이지 컴포넌트
│   │   ├── components/ # UI 컴포넌트
│   │   ├── types/    # 타입 정의
│   │   └── lib/      # API 클라이언트
│   └── package.json
├── PRD.md           # 제품 요구사항 문서
└── README.md
```

## 🎨 UI/UX 특징

- **모바일 퍼스트**: 스마트폰 사용에 최적화
- **카드형 UI**: 직관적인 정보 배치
- **컬러풀 디자인**: 포지션별 색상 구분
- **대담한 타이포그래피**: 명확한 정보 전달
- **프리미어리그 앱 스타일**: 스포츠 앱 감성

## 📊 API 엔드포인트

### 팀원 관리
- `GET /api/members` - 전체 팀원 목록
- `POST /api/members` - 새 팀원 등록
- `GET /api/members/:id` - 특정 팀원 조회
- `PATCH /api/members/:id` - 팀원 정보 수정
- `DELETE /api/members/:id` - 팀원 삭제

## 🚀 사용 가능한 스크립트

### 루트 디렉토리
```bash
npm run dev              # 백엔드 + 프론트엔드 동시 실행
npm run dev:backend      # 백엔드만 실행
npm run dev:frontend     # 프론트엔드만 실행
npm run build            # 전체 빌드
npm run install:all      # 모든 의존성 설치
```

### 백엔드
```bash
npm run start            # 프로덕션 실행
npm run start:dev        # 개발 모드 실행
npm run build            # 빌드
npm run test             # 테스트
```

### 프론트엔드
```bash
npm run dev              # 개발 서버 실행
npm run build            # 빌드
npm run start            # 프로덕션 서버 실행
```

## 📝 라이선스

MIT License 