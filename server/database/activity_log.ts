import { pgTable, uuid, varchar, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { akademiSchema } from './akademi-schema';

export const activity_log = akademiSchema.table('activity_log', {
  id: uuid('id').primaryKey().notNull(),
  instructor_id: uuid('instructor_id').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  description: text('description').notNull(),
  related_id: integer('related_id'),
  created_at: timestamp('created_at', { withTimezone: false }).notNull()
})
