import { pgTable, uuid, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  nik: varchar('nik', { length: 20 }).notNull().unique(), // NIK
  name: text('name').notNull(),
  username: varchar('username', { length: 32 }).notNull().unique(),
  email: varchar('email', { length: 128 }).notNull().unique(),
  nip: varchar('nip', { length: 20 }), // opsional, khusus ASN
  password_hash: text('password_hash').notNull(), // simpan hash password, bukan plain
  created_at: timestamp('created_at').defaultNow(),
});