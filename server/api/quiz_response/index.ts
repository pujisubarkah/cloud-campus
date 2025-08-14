import { db } from '@/server/db'
import { quizResponses } from '@/server/database/quiz_response'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const user = event.context.user || null
  
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required'
    })
  }

  if (event.method === 'POST') {
    try {
      const body = await readBody(event)
      const { quiz_id, user_answer, points_earned } = body

      if (!quiz_id || user_answer === undefined) {
        throw createError({
          statusCode: 400,
          statusMessage: 'quiz_id and user_answer are required'
        })
      }

      // Check if user already answered this quiz
      const existingResponse = await db
        .select()
        .from(quizResponses)
        .where(
          and(
            eq(quizResponses.quiz_id, quiz_id),
            eq(quizResponses.user_id, user.id)
          )
        )
        .limit(1)

      let response
      
      if (existingResponse.length > 0) {
        // Update existing response
        [response] = await db
          .update(quizResponses)
          .set({
            answer: String(user_answer),
            points_earned: points_earned || 0
          })
          .where(
            and(
              eq(quizResponses.quiz_id, quiz_id),
              eq(quizResponses.user_id, user.id)
            )
          )
          .returning()
      } else {
        // Create new response
        [response] = await db
          .insert(quizResponses)
          .values({
            quiz_id,
            user_id: user.id,
            answer: String(user_answer),
            points_earned: points_earned || 0
          })
          .returning()
      }

      return {
        success: true,
        response,
        points_earned: response.points_earned
      }

    } catch (error) {
      console.error('Error saving quiz response:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to save quiz response'
      })
    }
  }

  // GET method untuk mengambil quiz responses user
  if (event.method === 'GET') {
    try {
      const query = getQuery(event)
      const userId = query.user_id || user.id

      const responses = await db
        .select()
        .from(quizResponses)
        .where(eq(quizResponses.user_id, userId))

      return {
        success: true,
        responses
      }

    } catch (error) {
      console.error('Error fetching quiz responses:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch quiz responses'
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
