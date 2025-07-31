import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { quiz_questions } from './quiz_questions';
import { users } from './users';

// Jawaban yang diberikan siswa
export const quiz_answers = pgTable('quiz_answers', {
  id: uuid('id').primaryKey().defaultRandom(),
  question_id: uuid('question_id').notNull().references(() => quiz_questions.id),
  user_id: uuid('user_id').notNull().references(() => users.id),
  answer: text('answer').notNull(), // misal: 'A', 'B', dst
  is_correct: boolean('is_correct').default(false),
  answered_at: timestamp('answered_at').defaultNow(),
  explanation: text('explanation'), // opsional, penjelasan jawaban
});