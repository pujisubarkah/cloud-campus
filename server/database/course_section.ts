import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { courses } from './courses';
import { akademiSchema } from './akademi-schema';

export const courseSections = akademiSchema.table('course_sections', {
  id: uuid('id').primaryKey().defaultRandom(),
  course_id: uuid('course_id').notNull().references(() => courses.id),
  title: text('title').notNull(),
  order: integer('order'),
  created_at: timestamp('created_at').defaultNow(),
});
