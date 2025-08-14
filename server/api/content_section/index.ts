import { db } from '@/server/db'
import { sectionContents } from '@/server/database/content_section'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const method = event.method

  console.log('=== CONTENT_SECTION API ===')
  console.log('Method:', method)

  if (method === 'GET') {
    try {
      const query = getQuery(event)
      const sectionId = query.section_id

      if (!sectionId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'section_id parameter required'
        })
      }

      const contents = await db
        .select()
        .from(sectionContents)
        .where(eq(sectionContents.section_id, String(sectionId)))
        .orderBy(sectionContents.order)

      console.log('Contents found:', contents.length)
      return contents
    } catch (error) {
      console.error('Error fetching contents:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch contents'
      })
    }
  }

  if (method === 'POST') {
    try {
      const body = await readBody(event)
      console.log('Request body:', body)

      if (!body.section_id || !body.title || !body.content_url) {
        throw createError({
          statusCode: 400,
          statusMessage: 'section_id, title, and content_url are required'
        })
      }

      const [newContent] = await db
        .insert(sectionContents)
        .values({
          section_id: body.section_id,
          title: body.title,
          type: body.type || 'video',
          deskripsi: body.deskripsi || '',
          content_url: body.content_url,
          order: body.order || 1
        })
        .returning()

      console.log('Content created:', newContent)
      return {
        success: true,
        content: newContent
      }
    } catch (error) {
      console.error('Error creating content:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create content: ' + (error instanceof Error ? error.message : String(error))
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})