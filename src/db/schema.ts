// src/db/schema.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// 'guestbook' 이라는 테이블을 정의합니다.
export const Guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  message: text('message').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
});