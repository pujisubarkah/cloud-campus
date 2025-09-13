import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const pesan = pgTable('pesan', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  message: varchar('message', { length: 1000 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
