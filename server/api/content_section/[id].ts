// server/api/content_section/[id].ts
import { db } from '@/server/db'
import { sectionContents } from '@/server/database/content_section'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const contentId = getRouterParam(event, 'id')
  const method = event.method

  console.log('=== CONTENT_SECTION BY ID API ===')
  console.log('Content ID:', contentId)
  console.log('Method:', method)

  if (method === 'PUT') {
    try {
      const body = await readBody(event)
      console.log('Update content body:', body)

      if (!contentId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Content ID is required'
        })
      }

      const [updatedContent] = await db
        .update(sectionContents)
        .set({
          title: body.title,
          type: body.type,
          deskripsi: body.deskripsi,
          content_url: body.content_url,
          order: body.order
        })
        .where(eq(sectionContents.id, contentId as string))
        .returning()

      console.log('Content updated:', updatedContent)
      return {
        success: true,
        content: updatedContent
      }
    } catch (error) {
      console.error('Error updating content:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to update content'
      })
    }
  }

  if (method === 'DELETE') {
    try {
      if (!contentId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Content ID is required'
        })
      }
      await db
        .delete(sectionContents)
        .where(eq(sectionContents.id, contentId as string))

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