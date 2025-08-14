import { eq, and } from 'drizzle-orm'
import { db } from '@/server/db'
import { quizResponses } from '@/server/database/quiz_response'
import { users } from '@/server/database/users'
import { sectionQuizzes } from '@/server/database/section_quizzes'
import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'POST') {
    // Submit jawaban quiz
    const body = await readBody(event)
    const { user_id, quiz_id, answer, is_correct, points_earned } = body
    if (!user_id || !quiz_id || !answer) {
      throw createError({ statusCode: 400, message: 'user_id, quiz_id, and answer are required' })
    }
    const response = await db.insert(quizResponses).values({
      user_id,
      quiz_id,
      answer,
      is_correct: typeof is_correct === 'boolean' ? is_correct : null,
      points_earned: typeof points_earned === 'number' ? points_earned : 0
    }).returning()
    return { success: true, response: response[0] }
  }

  if (event.method === 'GET') {
    // Ambil semua response quiz user (bisa difilter by user_id, quiz_id)
    const { user_id, quiz_id } = getQuery(event)
    const whereArr = []
    if (user_id) whereArr.push(eq(quizResponses.user_id, String(user_id)))
    if (quiz_id) whereArr.push(eq(quizResponses.quiz_id, String(quiz_id)))
    const responses = await db.select().from(quizResponses)
      .where(whereArr.length ? whereArr.length === 1 ? whereArr[0] : and(...whereArr) : undefined)
    return { success: true, responses }
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
