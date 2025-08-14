// server/api/content_section/[id].ts
import { db } from '@/server/db'
import { sectionContents } from '@/server/database/content_section'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, 'id')
  const method = event.method

  console.log('=== DELETE_CONTENT API ===')
  console.log('Content ID:', contentId)
  console.log('Method:', method)

  if (method === 'DELETE') {
    if (!contentId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Content ID is required'
      })
    }
    try {
      await db
        .delete(sectionContents)
        .where(eq(sectionContents.id, contentId))

      console.log('Content deleted')
      return { 
        success: true,
        message: 'Content deleted successfully'
      }
    } catch (error) {
      console.error('Error deleting content:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to delete content'
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})