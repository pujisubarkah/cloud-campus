import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  password_hash: text('password_hash').notNull(),
  full_name: text('full_name').notNull(),
  role: text('role').notNull(),
  role_id: integer('role_id').notNull(), // tipe data int sesuai permintaan
  created_at: timestamp('created_at').defaultNow(),
});