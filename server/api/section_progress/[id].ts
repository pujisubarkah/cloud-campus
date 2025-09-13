import { db } from '@/server/db'
import { sectionProgress } from '@/server/database/section_progress'
import { eq } from 'drizzle-orm'

// GET: Ambil progress section berdasarkan id
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const id = event.context.params?.id
    if (!id) {
      return { error: 'id wajib diisi' }
    }
    const [progress] = await db
      .select()
      .from(sectionProgress)
      .where(eq(sectionProgress.id, id))
      .limit(1)
    if (!progress) {
      return { error: 'Progress tidak ditemukan' }
    }
    return { progress }
  }
  return { error: 'Method not allowed' }
})
