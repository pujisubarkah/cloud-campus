import { eq, and } from 'drizzle-orm'
import { db } from '@/server/db'
import { courseProgress } from '../../database/course_progress'
import { readBody, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const { user_id, course_id, section_id } = getQuery(event)
    const filters = []
    if (user_id) filters.push(eq(courseProgress.user_id, String(user_id)))
    if (course_id) filters.push(eq(courseProgress.course_id, String(course_id)))
    if (section_id) filters.push(eq(courseProgress.section_id, String(section_id)))

    let queryBuilder = db.select().from(courseProgress)
    let progressRows
    if (filters.length > 0) {
      progressRows = await db.select().from(courseProgress).where(and(...filters))
    } else {
      progressRows = await queryBuilder
    }

    // Hitung jumlah section di course
    let totalSections = 0
    if (course_id) {
      const sections = await db.select().from(require('../../database/course_section').courseSections)
        .where(eq(require('../../database/course_section').courseSections.course_id, String(course_id)))
      totalSections = sections.length
    }

    // Hitung jumlah section selesai
    const completedSections = progressRows.filter(row => (row.progress_percent ?? 0) >= 100).map(row => row.section_id)

    // Hitung overall percent (persentase section selesai dari total section)
    let overallPercent = 0
    if (totalSections > 0) {
      overallPercent = Math.round((completedSections.length / totalSections) * 100)
    }

    return {
      success: true,
      overall_percent: overallPercent,
      completed_sections: completedSections.length,
      total_sections: totalSections,
      progress_rows: progressRows
    }
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    const { user_id, course_id, section_id, progress_percent } = body

    const result = await db.insert(courseProgress).values({
      user_id,
      course_id,
      section_id,
      progress_percent,
      completed_at: progress_percent === 100 ? new Date() : null,
    })
    return { success: true, result }
  }

  return { error: 'Method not allowed' }
})