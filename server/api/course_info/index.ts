import { db } from '~/server/db'
import { course_info } from '~/server/database/course_info'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'GET') {
    // Ambil semua course_info
    const all = await db.select().from(course_info)
    return { success: true, course_info: all }
  }
  if (event.method === 'POST') {
    // Tambah course_info baru
    const body = await readBody(event)
    const inserted = await db.insert(course_info).values(body).returning()
    return inserted[0]
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed' }
})