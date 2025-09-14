import { pgTable, uuid, varchar, timestamp, pgSchema } from 'drizzle-orm/pg-core';
import { users } from './users';

const akademiSchema = pgSchema('akademi');

export const user_identity = akademiSchema.table('user_identity', {
  id: uuid('id').defaultRandom().primaryKey(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  unit_kerja: varchar('unit_kerja', { length: 128 }),
  jabatan: varchar('jabatan', { length: 128 }),
  pangkat_golongan: varchar('pangkat_golongan', { length: 64 }),
  foto_url: varchar('foto_url', { length: 256 }),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow()
});
