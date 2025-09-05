import { db } from '~/server/db'
import { course_info } from '~/server/database/course_info'
import { H3Event } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id
  if (!id) {
    event.res.statusCode = 400
    return { error: 'ID is required' }
  }

  if (event.method === 'GET') {
    // Ambil course_info berdasarkan id
    const info = await db.select().from(course_info).where(eq(course_info.id, id)).limit(1)
    if (!info.length) {
      event.res.statusCode = 404
      return { error: 'Course info not found' }
    }
    return info[0]
  }

  if (event.method === 'DELETE') {
    // Hapus course_info berdasarkan id
    const deleted = await db.delete(course_info).where(eq(course_info.id, id)).returning()
    if (!deleted.length) {
      event.res.statusCode = 404
      return { error: 'Course info not found or already deleted' }
    }
    return { success: true, deleted: deleted[0] }
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed' }
})
