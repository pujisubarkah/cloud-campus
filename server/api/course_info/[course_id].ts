import { db } from '~/server/db'
import { course_info } from '~/server/database/course_info'
import { H3Event } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  const course_id = event.context.params?.course_id
  if (!course_id) {
    return { error: 'course_id wajib diisi di URL' }
  }

  if (event.method === 'GET') {
    // Ambil course_info berdasarkan course_id
    const info = await db.select().from(course_info).where(eq(course_info.course_id, String(course_id)))
    return { success: true, course_info: info[0] || null }
  }

  return { error: 'Method not allowed' }
})
