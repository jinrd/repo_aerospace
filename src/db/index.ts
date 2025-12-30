import postgres from "postgres";
import {drizzle} from 'drizzle-orm/postgres-js'


// 환경변수 가져오기 (import.meta.env는 Astro 전용)
// 주의: SSR 모드가 아니면 클라이언트 쪽에 노출될 수 있으니 서버 코드(---) 안에서만 써야 함.
// 여기서는 process.env를 쓰거나 Astro 설정을 맞춰야 하는데, 
// 편의상 하드코딩된 connectionString을 쓰지 않고 import.meta.env를 쓰려면
// astro.config.mjs 설정이 필요할 수 있습니다. 
// 일단은 Node.js 방식인 process.env를 쓰겠습니다.

// const connectionString = process.env.DATABASE_URL || "postgres://myuser:mypassword@localhost:5432/aerospace_db";

// const connectionString = process.env.DATABASE_URL || import.meta.env.DATABASE_URL;
const connectionString = "postgresql://postgres:testdatabasepwd123@db.fuxuekelnlzmkyvqohtm.supabase.co:5432/postgres";
if (!connectionString) {
  throw new Error('❌ DATABASE_URL 환경변수가 없습니다. .env 파일이나 Vercel 설정을 확인하세요.');
}

// DB 클라이언트 설정
const client = postgres(connectionString, {
    prepare: false,
  // 👇 SSL 설정을 이렇게 객체로 바꿔보세요!
  ssl: {
    rejectUnauthorized: false // 인증서 검증 무시 (Supabase 연결 시 필수일 때가 많음)
  }
});
export const db = drizzle(client);