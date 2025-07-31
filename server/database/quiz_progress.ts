import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { quizzes } from './quizzes';

export const quizProgress = pgTable('quiz_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  user_id: uuid('user_id').notNull().references(() => users.id),
  quiz_id: uuid('quiz_id').notNull().references(() => quizzes.id),
  score: integer('score'), // nilai akhir kuis
  taken_at: timestamp('taken_at').defaultNow(), // waktu pengerjaan
  is_passed: integer('is_passed').default(0), // 1 = lulus, 0 = tidak
});
