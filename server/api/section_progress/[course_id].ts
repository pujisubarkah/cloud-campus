import { db } from '@/server/db'
import { sectionProgress } from '@/server/database/section_progress'
import { enrollments } from '@/server/database/enrollment'

import { courseSections } from '@/server/database/course_section'

import { getQuery } from 'h3'
import { eq } from 'drizzle-orm'

// GET: Ambil semua progress section
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const course_id = event.context.params?.course_id
    if (!course_id) {
      return { error: 'course_id wajib diisi' }
    }

    // Ambil semua user yang terdaftar di course (enrollments)
    const enrolledUsers = await db.select().from(enrollments).where(eq(enrollments.course_id, String(course_id)))
    const userIds = enrolledUsers.map(e => e.user_id)

    // Ambil semua section_id dari course_id
    const sections = await db.select().from(courseSections).where(eq(courseSections.course_id, String(course_id)))
    const sectionIds = sections.map(s => s.id)
    const totalSections = sectionIds.length

    // Gunakan inArray dari drizzle-orm
    const { inArray, and } = await import('drizzle-orm')
    // Ambil progress section untuk semua user yang terdaftar
    const progressRows = await db.select().from(sectionProgress).where(
      and(
        inArray(sectionProgress.section_id, sectionIds),
        inArray(sectionProgress.user_id, userIds)
      )
    )

    // Hitung jumlah section selesai per user
    const userProgress: { [userId: string]: { progress_percent: number; completed_sections: number; total_sections: number } } = {}
    userIds.forEach(userId => {
      const userRows = progressRows.filter(row => row.user_id === userId)
      const completedSections = userRows.filter(row => (row.progress_percent ?? 0) >= 100).length
      const percent = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0
      userProgress[userId] = {
        progress_percent: percent,
        completed_sections: completedSections,
        total_sections: totalSections
      }
    })

    const { user_id } = getQuery(event)
    if (user_id) {
      return { userProgress: { [String(user_id)]: userProgress[String(user_id)] || {
        progress_percent: 0,
        completed_sections: 0,
        totalSections
      } } }
    }
    return { userProgress }
  }
  return { error: 'Method not allowed' }
})