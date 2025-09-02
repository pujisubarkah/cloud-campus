import { db } from '~/server/db'
import { courses } from '~/server/database/courses'
import { users } from '~/server/database/users'
import { enrollments } from '~/server/database/enrollment'
import { courseSections } from '~/server/database/course_section'
import { courseProgress } from '~/server/database/course_progress'
import { sectionProgress } from '~/server/database/section_progress'
import { eq, and, inArray } from 'drizzle-orm'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // Get course ID from URL parameter
  const courseId = event.context.params?.id

  if (!courseId) {
    throw createError({
      statusCode: 400,
      message: 'Course ID is required'
    })
  }

  if (event.method === 'GET') {
    try {
      // Join courses with users to get instructor details
      const course = await db
        .select({
          id: courses.id,
          title: courses.title,
          slug: courses.slug,
          description: courses.description,
          thumbnail_url: courses.thumbnail_url,
          instructor_id: courses.instructor_id,
          created_at: courses.created_at,
          is_published: courses.is_published,
          instructor_name: users.full_name,
        })
        .from(courses)
        .leftJoin(users, eq(courses.instructor_id, users.id))
        .where(eq(courses.id, courseId))
        .limit(1)

      if (!course.length) {
        throw createError({
          statusCode: 404,
          message: 'Course not found'
        })
      }

      return { course: course[0] }
    } catch (error) {
      console.error('Error fetching course:', error)
      if (error instanceof Error) {
        throw createError({
          statusCode: 500,
          message: error.message || 'Failed to fetch course'
        })
      } else if (typeof error === 'object' && error !== null && 'statusCode' in error && 'message' in error) {
        throw createError({
          statusCode: (error as any).statusCode || 500,
          message: (error as any).message || 'Failed to fetch course'
        })
      } else {
        throw createError({
          statusCode: 500,
          message: 'Failed to fetch course'
        })
      }
    }
  } else if (event.method === 'PATCH') {
    const body = await readBody(event)

    // Update the is_published field for the specific course
    await db.update(courses)
      .set({ is_published: body.is_published })
      .where(eq(courses.id, courseId))

    return { success: true }
  } else if (event.method === 'PUT') {
    try {
      const body = await readBody(event)

      // Check if course exists before updating
      const existingCourse = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))
        .limit(1)

      if (!existingCourse.length) {
        throw createError({
          statusCode: 404,
          message: 'Course not found'
        })
      }

      // Prepare update data - only include fields that are provided
      const updateData: any = {}
      
      if (body.title !== undefined) {
        updateData.title = body.title
      }
      
      if (body.slug !== undefined) {
        updateData.slug = body.slug
      }
      
      if (body.description !== undefined) {
        updateData.description = body.description
      }
      
      if (body.thumbnail_url !== undefined) {
        updateData.thumbnail_url = body.thumbnail_url
      }
      
      if (body.is_published !== undefined) {
        updateData.is_published = body.is_published
      }

      // Update the course
      const updatedCourse = await db
        .update(courses)
        .set(updateData)
        .where(eq(courses.id, courseId))
        .returning()

      return { 
        success: true, 
        message: 'Course updated successfully',
        course: updatedCourse[0]
      }
    } catch (error) {
      console.error('Error updating course:', error)
      if (error instanceof Error) {
        throw createError({
          statusCode: 500,
          message: error.message || 'Failed to update course'
        })
      } else if (typeof error === 'object' && error !== null && 'statusCode' in error && 'message' in error) {
        throw createError({
          statusCode: (error as any).statusCode || 500,
          message: (error as any).message || 'Failed to update course'
        })
      } else {
        throw createError({
          statusCode: 500,
          message: 'Failed to update course'
        })
      }
    }
  } else if (event.method === 'DELETE') {
    try {
      // Check if course exists before deletion
      const existingCourse = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId))
        .limit(1)

      if (!existingCourse.length) {
        throw createError({
          statusCode: 404,
          message: 'Course not found'
        })
      }

      // Delete related records first to avoid foreign key constraint errors
      console.log(`Starting deletion process for course: ${courseId}`)
      
      // Get all section IDs for this course first
      const sectionsToDelete = await db
        .select({ id: courseSections.id })
        .from(courseSections)
        .where(eq(courseSections.course_id, courseId))
      
      console.log(`Found ${sectionsToDelete.length} sections to delete`)
      const sectionIds = sectionsToDelete.map(section => section.id)
      
      // Delete section-related data if there are sections
      if (sectionIds.length > 0) {
        console.log('Deleting section-related data...')
        
        // Delete section progress (user progress in sections)
        try {
          const deletedProgress = await db.delete(sectionProgress).where(inArray(sectionProgress.section_id, sectionIds))
          console.log('Section progress deleted successfully')
        } catch (error) {
          console.log('Section progress table does not exist or no data to delete')
        }
      }
      
      // Delete course progress records (user progress in overall course)
      try {
        const deletedCourseProgress = await db.delete(courseProgress).where(eq(courseProgress.course_id, courseId))
        console.log('Course progress deleted successfully')
      } catch (error) {
        console.log('Course progress table does not exist or no data to delete')
      }
      
      // Delete enrollments (student enrollments in course)
      try {
        const deletedEnrollments = await db.delete(enrollments).where(eq(enrollments.course_id, courseId))
        console.log('Enrollments deleted successfully')
      } catch (error) {
        console.log('Enrollments table does not exist or no data to delete')
      }
      
      // Delete course sections
      if (sectionIds.length > 0) {
        try {
          const deletedSections = await db.delete(courseSections).where(eq(courseSections.course_id, courseId))
          console.log('Course sections deleted successfully')
        } catch (error) {
          console.log('Course sections table does not exist or no data to delete')
        }
      }
      
      // Finally delete the course
      console.log('Deleting main course record...')
      await db.delete(courses).where(eq(courses.id, courseId))
      console.log('Course deleted successfully')

      return { 
        success: true, 
        message: 'Course and all related data deleted successfully',
        deletedCourse: existingCourse[0]
      }
    } catch (error) {
      console.error('Error deleting course:', error)
      if (error instanceof Error) {
        throw createError({
          statusCode: 500,
          message: error.message || 'Failed to delete course'
        })
      } else if (typeof error === 'object' && error !== null && 'statusCode' in error && 'message' in error) {
        throw createError({
          statusCode: (error as any).statusCode || 500,
          message: (error as any).message || 'Failed to delete course'
        })
      } else {
        throw createError({
          statusCode: 500,
          message: 'Failed to delete course'
        })
      }
    }
  }

  // Handle unsupported methods
  throw createError({
    statusCode: 405,
    message: 'Method not allowed'
  })
})