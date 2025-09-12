import { db } from '~/server/db'
import { courses } from '~/server/database/courses'
import { users } from '~/server/database/users'
import { enrollments } from '~/server/database/enrollment'
import { courseSections } from '~/server/database/course_section'
import { courseProgress } from '~/server/database/course_progress'
import { eq, inArray } from 'drizzle-orm'
import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const instructorId = event.context.params?.instructor_id
  if (!instructorId) {
    throw createError({ statusCode: 400, message: 'Instructor ID is required' })
  }

  // Ambil semua kursus milik instruktur
  const coursesList = await db.select().from(courses).where(eq(courses.instructor_id, instructorId))
  const courseIds = coursesList.map(c => c.id)

  // Ambil semua sections di kursus instruktur
  const sectionsList = await db.select().from(courseSections).where(inArray(courseSections.course_id, courseIds))
  const sectionMap = Object.fromEntries(sectionsList.map(s => [s.course_id, s.title]))

  // Ambil semua enrollments di kursus instruktur
  const enrollmentsList = await db.select().from(enrollments).where(inArray(enrollments.course_id, courseIds))
  const studentIds = enrollmentsList.map(e => e.user_id)

  // Ambil data user siswa
  const students = await db.select().from(users).where(inArray(users.id, studentIds))
  const studentMap = Object.fromEntries(students.map(s => [s.id, s.full_name || s.email]))

  // Ambil progress siswa di setiap kursus
  const progressList = await db.select().from(courseProgress).where(inArray(courseProgress.user_id, studentIds))

  // Bentuk response flat
  const progress = enrollmentsList.map((enroll, idx) => {
    const progressData = progressList.find(p => p.user_id === enroll.user_id && p.course_id === enroll.course_id)
    return {
      id: idx + 1,
      student: studentMap[enroll.user_id] || '-',
      course: coursesList.find(c => c.id === enroll.course_id)?.title || '-',
      section: sectionMap[enroll.course_id] || '-',
      progress_percent: progressData?.progress_percent || 0,
      is_completed: !!progressData?.completed_at
    }
  });

  return {
    success: true,
    progress
  }
})
