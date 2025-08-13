import { db } from '~/server/db'
import { enrollments } from '@/server/database/enrollment'
import { courses } from '~/server/database/courses'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  console.log('=== ENROLLMENT API CALLED ===')
  console.log('Method:', event.method)
  console.log('Headers:', getHeaders(event))
  
  // Get authenticated user from context
  const user = event.context.user
  console.log('User from context:', user)
  
  if (!user || !user.id) {
    console.log('❌ No user in context')
    throw createError({
      statusCode: 401,
      statusMessage: 'Please login first'
    })
  }

  console.log('✅ User authenticated:', user.id)

  // GET: Fetch enrollments for current user
  if (event.method === 'GET') {
    try {
      console.log('📥 Fetching enrollments for user:', user.id)
      
      const userEnrollments = await db
        .select({
          enrollment_id: enrollments.id,
          enrolled_at: enrollments.enrolled_at,
          course_id: courses.id,
          course_title: courses.title,
          course_slug: courses.slug,
          course_description: courses.description,
          course_thumbnail: courses.thumbnail_url
        })
        .from(enrollments)
        .leftJoin(courses, eq(enrollments.course_id, courses.id))
        .where(eq(enrollments.user_id, user.id))
        .orderBy(enrollments.enrolled_at)

      console.log('📋 DB Query result:', userEnrollments)
      console.log('📋 Found enrollments count:', userEnrollments.length)

      const response = {
        success: true,
        enrollments: userEnrollments || []
      }
      
      console.log('📤 API Response:', response)
      return response
      
    } catch (error) {
      console.error('❌ Error fetching enrollments:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch enrollments'
      })
    }
  }

  // POST: Create new enrollment
  if (event.method === 'POST') {
    try {
      const body = await readBody(event)
      console.log('📥 POST body:', body)

      if (!body.course_id) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Course ID is required'
        })
      }

      // Check if already enrolled
      const existingEnrollment = await db
        .select()
        .from(enrollments)
        .where(
          and(
            eq(enrollments.user_id, user.id),
            eq(enrollments.course_id, body.course_id)
          )
        )
        .limit(1)

      if (existingEnrollment.length > 0) {
        console.log('⚠️ Already enrolled')
        throw createError({
          statusCode: 400,
          statusMessage: 'Already enrolled in this course'
        })
      }

      // Create new enrollment
      const [newEnrollment] = await db
        .insert(enrollments)
        .values({
          user_id: user.id,
          course_id: body.course_id
        })
        .returning()

      console.log('✅ New enrollment created:', newEnrollment)

      return {
        success: true,
        enrollment: newEnrollment
      }
    } catch (error) {
      console.error('❌ Error creating enrollment:', error)
      let statusCode = 500;
      let statusMessage = 'Failed to create enrollment';
      if (typeof error === 'object' && error !== null) {
        if ('statusCode' in error && typeof (error as any).statusCode === 'number') {
          statusCode = (error as any).statusCode;
        }
        if ('statusMessage' in error && typeof (error as any).statusMessage === 'string') {
          statusMessage = (error as any).statusMessage;
        }
      }
      throw createError({
        statusCode,
        statusMessage
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})