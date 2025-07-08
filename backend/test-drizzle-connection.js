const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function testDrizzleConnection() {
  try {
    console.log('🔌 Drizzle + Neon PostgreSQL 연결 테스트 중...');

    const sql = neon(process.env.DATABASE_URL);

    // 연결 테스트
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ 연결 성공!');
    console.log('📅 현재 시간:', result[0].current_time);

    // 테이블 존재 확인
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log(
      '📋 존재하는 테이블:',
      tables.map((r) => r.table_name),
    );

    // members 테이블 구조 확인
    try {
      const membersStructure = await sql`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = 'members'
        ORDER BY ordinal_position
      `;
      console.log('👥 members 테이블 구조:', membersStructure);
    } catch (error) {
      console.log('⚠️ members 테이블이 아직 생성되지 않았습니다.');
    }
  } catch (error) {
    console.error('❌ 연결 실패:', error.message);
    console.error('🔍 상세 오류:', error);
  }
}

testDrizzleConnection();
