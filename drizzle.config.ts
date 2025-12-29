import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./src/db/schema.ts", // 스키마 파일 위치
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    }
});