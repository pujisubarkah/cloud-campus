import { db } from '~/server/db'
import { courses } from '~/server/database/courses'
import { users } from '~/server/database/users'
import { enrollments } from '~/server/database/enrollment'
import { courseSections } from '~/server/database/course_section'
import { courseProgress } from '~/server/database/course_progress'
import { sectionProgress } from '~/server/database/section_progress'
// Update the import path to match the correct location and filename
import { activity_log } from '~/server/database/activity_log'
// If the file does not exist, create '~/server/database/activityLog.ts' and export 'activity_log' from it.
import { eq, and, inArray, desc } from 'drizzle-orm'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Ambil instructorId dari path param sebagai string
  const instructorId = event.context.params?.instructor_id
  if (!instructorId) {
    throw createError({ statusCode: 400, message: 'Instructor ID is required' })
  }

  // Ambil semua kursus milik instruktur
  const coursesList = await db.select().from(courses).where(eq(courses.instructor_id, instructorId))
  const courseIds = coursesList.map(c => c.id)

  // Hitung total kursus
  const totalCourses = coursesList.length

  // Hitung total peserta (enrollments di semua kursus instruktur)
  let totalStudents = 0
  if (courseIds.length > 0) {
    totalStudents = await db
      .select()
      .from(enrollments)
      .where(inArray(enrollments.course_id, courseIds))
      .then(rows => rows.length)
  }

  // Hitung total materi (content di semua kursus instruktur)
  let totalContent = 0
  if (courseIds.length > 0) {
    totalContent = await db
      .select()
      .from(courseSections)
      .where(inArray(courseSections.course_id, courseIds))
      .then(rows => rows.length)
  }

  return {
    success: true,
    stats: { totalCourses, totalStudents, totalContent }
  }
})