import { db } from '~/server/db';
import { courses } from '~/server/database/courses';
import { eq } from 'drizzle-orm';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  const instructorId = event.context.params?.id;

  if (!instructorId) {
    return { error: 'instructor_id is required in the URL' };
  }

  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.instructor_id, instructorId));

  return result;
});
