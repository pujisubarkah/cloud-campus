import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { courses } from './courses';

// Tabel Kuis
export const quizzes = pgTable('quizzes', {
  id: uuid('id').primaryKey().defaultRandom(),
  course_id: uuid('course_id').notNull().references(() => courses.id),
  title: text('title').notNull(),
  description: text('description'),
  duration: text('duration'), // misal format "10m", "1h"
  created_at: timestamp('created_at').defaultNow(),
});