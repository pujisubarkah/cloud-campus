import { db } from '~/server/db'
import { courses } from '~/server/database/courses'
import { eq } from 'drizzle-orm'
import { H3Event, readBody } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const id = event.context.params?.id
  if (!id) {
    return { success: false, error: 'Course ID not provided.' }
  }
  if (event.method === 'PATCH') {
    const body = await readBody(event)
    await db.update(courses)
      .set({ is_published: body.is_published })
      .where(eq(courses.id, id))
    return { success: true }
  }
})