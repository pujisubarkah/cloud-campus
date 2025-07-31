import { pgTable, uuid, text, integer } from 'drizzle-orm/pg-core';
import { quizzes } from './quizzes';

// Pertanyaan Kuis
export const quiz_questions = pgTable('quiz_questions', {
  id: uuid('id').primaryKey().defaultRandom(),
  quiz_id: uuid('quiz_id').notNull().references(() => quizzes.id),
  question_text: text('question_text').notNull(),
  option_a: text('option_a').notNull(),
  option_b: text('option_b').notNull(),
  option_c: text('option_c'),
  option_d: text('option_d'),
  correct_answer: text('correct_answer').notNull(), // misal: 'A', 'B', dst
  order: integer('order'),
});