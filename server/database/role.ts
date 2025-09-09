import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const roles = pgTable('role', {
  id: integer('role_id').primaryKey(),
  nama: text('role_nama').notNull().unique(),
});

