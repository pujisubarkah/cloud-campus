import { db } from '@/server/db'
import { courseSections } from '@/server/database/course_section'
import { sectionContents } from '@/server/database/content_section'
import { eq, sql } from 'drizzle-orm'

// GET: Ambil semua section beserta kontennya
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const courseId = query.course_id

  console.log('=== COURSE_SECTION API ===')
  console.log('Course ID:', courseId)

  if (!courseId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'course_id parameter required'
    })
  }

  try {
    // First get sections
    const sectionsData = await db
      .select()
      .from(courseSections)
      .where(eq(courseSections.course_id, String(courseId)))
      .orderBy(courseSections.order)

    console.log('Raw sections from DB:', sectionsData)

    // Then get contents for each section
    const sectionsWithContents = await Promise.all(
      sectionsData.map(async (section) => {
        const contents = await db
          .select()
          .from(sectionContents)
          .where(eq(sectionContents.section_id, section.id))
          .orderBy(sectionContents.order)

        return {
          ...section,
          contents: contents || []
        }
      })
    )

    console.log('Sections with contents:', sectionsWithContents)

    return {
      success: true,
      sections: sectionsWithContents
    }
  } catch (error) {
    console.error('Error fetching sections:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch sections'
    })
  }
})