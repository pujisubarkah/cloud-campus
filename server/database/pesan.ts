import { pgTable, serial, varchar, timestamp, pgSchema } from 'drizzle-orm/pg-core';

const akademiSchema = pgSchema('akademi');

export const pesan = akademiSchema.table('pesan', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  message: varchar('message', { length: 1000 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});
