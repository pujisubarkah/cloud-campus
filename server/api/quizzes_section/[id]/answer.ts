import { db } from '@/server/db'
import { quizResponses } from '@/server/database/quiz_response'
import { sectionQuizzes } from '@/server/database/section_quizzes'
import { eq, and } from 'drizzle-orm'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const quiz_id = event.context.params?.id
  const user = event.context.user || null

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { user_answer } = body

    if (!quiz_id || user_answer === undefined) {
      throw createError({
        statusCode: 400,
        statusMessage: 'quiz_id dan user_answer wajib diisi'
      })
    }

    // Ambil data quiz
    const quiz = await db.select().from(sectionQuizzes).where(eq(sectionQuizzes.id, quiz_id)).limit(1)
    if (!quiz.length) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Quiz tidak ditemukan'
      })
    }
    const quizData = quiz[0]

    // Penilaian otomatis
    let is_correct = null
    let points_earned = 0
    if (quizData.type === 'multiple' || quizData.type === 'truefalse') {
      is_correct = String(user_answer) === String(quizData.correct_answer)
      points_earned = is_correct ? (quizData.points || 10) : 0
    } else if (quizData.type === 'likert') {
      points_earned = quizData.points || 10
    } else {
      points_earned = quizData.points || 5
    }

    // Cek jika sudah pernah menjawab
    const existingResponse = await db.select().from(quizResponses)
      .where(and(eq(quizResponses.quiz_id, quiz_id), eq(quizResponses.user_id, user.id))).limit(1)

    let response
    if (existingResponse.length > 0) {
      [response] = await db.update(quizResponses)
        .set({
          answer: String(user_answer),
          is_correct,
          points_earned
        })
        .where(and(eq(quizResponses.quiz_id, quiz_id), eq(quizResponses.user_id, user.id)))
        .returning()
    } else {
      [response] = await db.insert(quizResponses)
        .values({
          quiz_id,
          user_id: user.id,
          answer: String(user_answer),
          is_correct,
          points_earned
        })
        .returning()
    }

    return {
      success: true,
      response,
      points_earned: response.points_earned
    }
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed untuk endpoint ini' }
})
