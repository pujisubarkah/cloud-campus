import { eq, and, isNull } from 'drizzle-orm'
import { db } from '@/server/db'
import { courseProgress } from '../../database/course_progress'
import { courseSections } from '../../database/course_section'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    return { error: 'Method not allowed' }
  }
  const body = await readBody(event)
  const { user_id, course_id } = body
  if (!user_id || !course_id) {
    return { error: 'user_id dan course_id wajib diisi' }
  }

  // Ambil semua section di course
  const sections = await db.select().from(courseSections)
    .where(eq(courseSections.course_id, String(course_id)))
  const sectionIds = sections.map(s => s.id)

  // Ambil semua progress section user
  const completedSections = await db.select().from(courseProgress)
    .where(and(eq(courseProgress.user_id, String(user_id)), eq(courseProgress.course_id, String(course_id)), isNull(courseProgress.section_id)))
  // Cek apakah sudah ada baris total progress
  let totalProgressRow = completedSections[0]

  // Hitung jumlah section selesai
  const sectionProgressRows = await db.select().from(courseProgress)
    .where(and(eq(courseProgress.user_id, String(user_id)), eq(courseProgress.course_id, String(course_id))))
  const completedSectionIds = sectionProgressRows
    .filter(row => row.section_id && row.progress_percent !== null && row.progress_percent >= 100)
    .map(row => row.section_id)

  const allCompleted = sectionIds.length > 0 && sectionIds.every(id => completedSectionIds.includes(id))

  if (allCompleted) {
    // Update atau insert total progress
    if (totalProgressRow) {
      await db.update(courseProgress)
        .set({ progress_percent: 100, completed_at: new Date() })
        .where(eq(courseProgress.id, totalProgressRow.id))
    } else {
      await db.insert(courseProgress).values({
        user_id,
        course_id,
        section_id: null,
        progress_percent: 100,
        completed_at: new Date(),
      })
    }
    return { success: true, message: 'Course progress updated to 100%' }
  } else {
    return { success: false, message: 'Belum semua section selesai' }
  }
})
