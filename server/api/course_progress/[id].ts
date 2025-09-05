import { eq, and } from 'drizzle-orm'
import { db } from '@/server/db'
import { courseProgress } from '../../database/course_progress'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id

  if (!id) {
    return { error: 'course_progress id wajib diisi di URL' }
  }

  if (event.method === 'GET') {
    // Ambil satu row course_progress by id
    const row = await db.select().from(courseProgress).where(eq(courseProgress.id, String(id)))
    return { success: true, progress: row[0] || null }
  }

  if (event.method === 'PUT') {
    // Update progress_percent dan completed_at
    const body = await readBody(event)
    const { progress_percent } = body
    let completed_at = null
    if (progress_percent === 100) completed_at = new Date()
    const updated = await db.update(courseProgress)
      .set({ progress_percent, completed_at })
      .where(eq(courseProgress.id, String(id)))
      .returning()
    return { success: true, progress: updated[0] || null }
  }

  if (event.method === 'DELETE') {
    // Hapus row course_progress by id
    await db.delete(courseProgress).where(eq(courseProgress.id, String(id)))
    return { success: true }
  }

  return { error: 'Method not allowed' }
})
