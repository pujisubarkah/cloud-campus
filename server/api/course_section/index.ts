import { db } from '@/server/db'
import { courseSections } from '@/server/database/course_section'
import { readBody } from 'h3'

// GET: Ambil semua section
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const data = await db.select().from(courseSections)
    return { sections: data }
  }

  // POST: Tambah section baru
  if (event.method === 'POST') {
    const body = await readBody(event)
    const { course_id, title, order } = body

    if (!course_id || !title) {
      return { error: 'course_id dan title wajib diisi' }
    }

    const [newSection] = await db
      .insert(courseSections)
      .values({ course_id, title, order })
      .returning()

    return { success: true, section: newSection }
  }

  return { error: 'Method not allowed' }
})