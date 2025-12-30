
// src/db/index.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// 1. 환경변수 가져오기 (process.env 우선)
const connectionString = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;

// 2. 디버깅용 로그 (비밀번호는 가리고 출력)
if (!connectionString) {
  console.error("❌ FATAL: DATABASE_URL is missing!");
} else {
  console.log("✅ DB Connection String found:", connectionString.replace(/:[^:@]*@/, ":****@")); 
}

// 3. 클라이언트 생성 (Vercel 최적화 옵션)
const client = postgres(connectionString!, { 
  prepare: false, // Vercel(Transaction Mode) 필수 옵션
  // ssl: {
  //   rejectUnauthorized: false // 👇 이게 핵심! 보안 경고 무시하고 연결 시도
  // },
  ssl: 'require', // Vercel 권장 SSL 설정
  idle_timeout: 10, // 10초 후 연결 끊기 (서버리스 최적화)
  connect_timeout: 10 // 10초 동안 연결 안 되면 에러
});

export const db = drizzle(client);