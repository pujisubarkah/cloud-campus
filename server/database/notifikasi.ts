import { pgTable, uuid, text, boolean, timestamp, pgSchema } from 'drizzle-orm/pg-core'

const akademiSchema = pgSchema('akademi');

export const notifikasi = akademiSchema.table('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull(),
  pesan: text('pesan').notNull(),
  dibaca: boolean('dibaca').default(false).notNull(),
  created_by: uuid('created_by').notNull()
})
