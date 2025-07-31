import { eq, and } from 'drizzle-orm'
import { db } from '@/server/db'
import { quizProgress } from '../../database/quiz_progress'
import { readBody, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const { user_id, quiz_id } = getQuery(event)
    const filters = []
    if (user_id) filters.push(eq(quizProgress.user_id, String(user_id)))
    if (quiz_id) filters.push(eq(quizProgress.quiz_id, String(quiz_id)))

    const data = await (
      filters.length > 0
        ? db.select().from(quizProgress).where(and(...filters))
        : db.select().from(quizProgress)
    )
    return data
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { user_id, quiz_id, score, is_passed } = body

    const result = await db.insert(quizProgress).values({
      user_id,
      quiz_id,
      score,
      is_passed,
      taken_at: new Date(),
    })
    return { success: true, result }
  }

  return { error: 'Method not allowed' }
})