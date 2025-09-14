import { pgTable, integer, text, pgSchema } from 'drizzle-orm/pg-core';

const akademiSchema = pgSchema('akademi');

export const roles = akademiSchema.table('role', {
  id: integer('role_id').primaryKey(),
  nama: text('role_nama').notNull().unique(),
});

