import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

// 환경 변수 확인
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Neon PostgreSQL 연결
const sql = neon(process.env.DATABASE_URL);

// Drizzle 인스턴스 생성
export const db = drizzle(sql, { schema });

// 연결 테스트 함수
export async function testConnection() {
  try {
    console.log('🔌 Drizzle + Neon PostgreSQL 연결 테스트 중...');

    // 간단한 쿼리로 연결 테스트
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ 연결 성공!');
    console.log('📅 현재 시간:', result[0].current_time);

    return true;
  } catch (error) {
    console.error('❌ 연결 실패:', error);
    return false;
  }
}
