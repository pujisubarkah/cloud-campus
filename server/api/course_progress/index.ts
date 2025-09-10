import { eq, and } from 'drizzle-orm'
import { db } from '@/server/db'
import { courseProgress } from '../../database/course_progress'
import { courseSections } from '../../database/course_section'
import { readBody, getQuery } from 'h3'
import { watch } from 'vue'

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
      const { user_id, course_id, section_id } = getQuery(event)
      // Jika hanya user_id, return progress semua course user
      if (user_id && !course_id && !section_id) {
        // Ambil semua progress user
        const progressRows = await db.select().from(courseProgress).where(eq(courseProgress.user_id, String(user_id)))
        // Group by course_id
        const grouped: { [key: string]: typeof progressRows } = {}
        for (const row of progressRows) {
          if (!grouped[row.course_id]) grouped[row.course_id] = []
          grouped[row.course_id].push(row)
        }
        // Ambil semua course_id
        const courseIds = Object.keys(grouped)
        // Ambil semua section untuk course yang diambil user
        const allSections = await db.select().from(courseSections)
        const result: { [key: string]: { overall_percent: number; completed_sections: number; total_sections: number } } = {}
        for (const course_id of courseIds) {
          const sections = grouped[course_id]
          const totalSections = allSections.filter(s => String(s.course_id) === String(course_id)).length
          const completedSections = sections.filter(row => (row.progress_percent ?? 0) >= 100).length
          const overallPercent = totalSections > 0 ? Math.round((completedSections / totalSections) * 100) : 0
          result[course_id] = {
            overall_percent: overallPercent,
            completed_sections: completedSections,
            total_sections: totalSections
          }
        }
        return result
      }
      // Default: logic lama (by course_id/section_id)
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
        const sections = await db.select().from(courseSections)
          .where(eq(courseSections.course_id, String(course_id)))
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

// Declare enrollments variable (replace with actual data source as needed)
const enrollments: unknown[] = []; // TODO: Replace with actual enrollments data

// Example: Define a mock 'auth' object (replace with your actual authentication logic)
const auth = { user: { id: 'example-user-id' } };

function fetchEnrollmentsAndProgress() {
  // TODO: Implement logic to fetch enrollments and progress
  // This is a placeholder to avoid compile errors
  console.log('Fetching enrollments and progress...');
}

watch(
  enrollments,
  (newEnrollments, oldEnrollments) => {
    if (auth.user?.id && newEnrollments !== oldEnrollments) {
      fetchEnrollmentsAndProgress();
    }
  },
  { deep: true }
);