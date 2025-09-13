import { db } from '@/server/db';
import { courseSections } from '@/server/database/course_section';
import { eq, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.method;

  if (method === 'GET') {
    try {
      const query = getQuery(event);
      const courseId = query.course_id;

      let countQuery = db
        .select({ total: sql<number>`COUNT(*)` })
        .from(courseSections);

      // .where() harus terakhir sebelum await
      const result = courseId
        ? await countQuery.where(eq(courseSections.course_id, String(courseId)))
        : await countQuery;
      const total_content = result[0]?.total ?? 0;
      return { total_content };
    } catch (error) {
      console.error('Error fetching sections:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch sections'
      });
    }
  }


  // Method not allowed
  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  });
});
