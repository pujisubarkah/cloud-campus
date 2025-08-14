// server/api/quizzes_section/[id].ts
import { db } from '@/server/db'
import { sectionQuizzes } from '@/server/database/section_quizzes'
// If 'quizzes' is exported under a different name, import it accordingly, e.g.:
// import { sectionQuizzes, actualQuizzesExportName as quizzes } from '@/server/database/section_quizzes'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const sectionId = getRouterParam(event, 'id')
  const method = event.method

  if (!sectionId || typeof sectionId !== 'string') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Section ID is required and must be a string'
    })
  }

  console.log('=== QUIZZES_SECTION API ===')
  console.log('Section ID:', sectionId)
  console.log('Method:', method)

  if (method === 'GET') {
    try {
      const quizzesResult: any[] = await db
        .select()
        .from(sectionQuizzes)
        .where(eq(sectionQuizzes.section_id, sectionId))
        .orderBy(sectionQuizzes.order)

      console.log('Quizzes found:', quizzesResult.length)
      return {
        success: true,
        quizzes: quizzesResult
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch quizzes'
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      console.log('Creating quiz:', body)

      if (!body.question || !body.type) {
        throw createError({
          statusCode: 400,
          statusMessage: 'question and type are required'
        })
      }

      const [newQuiz] = await db
        .insert(sectionQuizzes)
        .values({
          section_id: sectionId,
          type: body.type,
          question: body.question,
          choices: body.choices || null,
          correct_answer: body.correct_answer || null,
          order: body.order || 1,
          points: body.points || 10
        })
        .returning()

      console.log('Quiz created:', newQuiz)
      return {
        success: true,
        quiz: newQuiz
      }
    } catch (error) {
      console.error('Error creating quiz:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create quiz: ' + (error instanceof Error ? error.message : String(error))
      })
    }
  }

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      console.log('Updating quiz:', body)

      if (!body.quiz_id) {
        throw createError({
          statusCode: 400,
          statusMessage: 'quiz_id is required for update'
        })
      }

      const [updatedQuiz] = await db
        .update(sectionQuizzes)
        .set({
          type: body.type,
          question: body.question,
          choices: body.choices,
          correct_answer: body.correct_answer,
          order: body.order,
          points: body.points || 10
        })
        .where(
          and(
            eq(sectionQuizzes.id, body.quiz_id),
            eq(sectionQuizzes.section_id, sectionId)
          )
        )
        .returning()

      console.log('Quiz updated:', updatedQuiz)
      return {
        success: true,
        quiz: updatedQuiz
      }
    } catch (error) {
      console.error('Error updating quiz:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update quiz: ' + (error instanceof Error ? error.message : String(error))
      })
    }
  }

  if (method === 'DELETE') {
    try {
      const body = await readBody(event)
      console.log('Deleting quiz:', body.quiz_id)

      if (!body.quiz_id) {
        throw createError({
          statusCode: 400,
          statusMessage: 'quiz_id is required for delete'
        })
      }

      await db
        .delete(sectionQuizzes)
        .where(
          and(
            eq(sectionQuizzes.id, body.quiz_id),
            eq(sectionQuizzes.section_id, sectionId)
          )
        )

      console.log('Quiz deleted')
      return {
        success: true,
        message: 'Quiz deleted successfully'
      }
    } catch (error) {
      console.error('Error deleting quiz:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete quiz'
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})