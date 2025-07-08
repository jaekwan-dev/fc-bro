const { Client } = require('pg');

async function testConnection() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    console.log('🔌 Neon PostgreSQL 연결 테스트 중...');
    await client.connect();
    console.log('✅ 연결 성공!');

    const result = await client.query('SELECT NOW()');
    console.log('📅 현재 시간:', result.rows[0].now);

    // 테이블 존재 확인
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log(
      '📋 존재하는 테이블:',
      tables.rows.map((r) => r.table_name),
    );
  } catch (error) {
    console.error('❌ 연결 실패:', error.message);
    console.error('🔍 상세 오류:', error);
  } finally {
    await client.end();
  }
}

// .env 파일 로드
require('dotenv').config();

testConnection();
