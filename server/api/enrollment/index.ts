import { db } from '@/server/db'
import { enrollments } from '@/server/database/enrollment'
import { courses } from '@/server/database/courses'
import { readBody } from 'h3'
import { eq } from 'drizzle-orm'

// GET: Ambil semua enrollment
export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    // Join enrollments dengan courses
    const data = await db
      .select({
        enrollmentId: enrollments.id,
        enrolled_at: enrollments.enrolled_at,
        user_id: enrollments.user_id,
        course_id: enrollments.course_id,
        course_title: courses.title,
        course_slug: courses.slug,
        course_description: courses.description,
        course_thumbnail: courses.thumbnail_url
      })
      .from(enrollments)
      .leftJoin(courses, eq(enrollments.course_id, courses.id))

    return { enrollments: data }
  }

  // POST: Tambah enrollment baru
  if (event.method === 'POST') {
    const body = await readBody(event)
    const { user_id, course_id } = body

    if (!user_id || !course_id) {
      return { error: 'user_id dan course_id wajib diisi' }
    }

    // Insert enrollment
    const [newEnrollment] = await db
      .insert(enrollments)
      .values({ user_id, course_id })
      .returning()

    return { success: true, enrollment: newEnrollment }
  }

  return { error: 'Method not allowed' }
})