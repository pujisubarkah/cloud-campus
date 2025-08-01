// server/api/course/index.ts
import { db } from '~/server/db'; // pastikan path db sesuai setup kamu
import { courses } from '~/server/database/courses'; // path model courses
import { eq } from 'drizzle-orm';
import { H3Event, readBody } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'GET') {
    // Get all courses
    const allCourses = await db.select().from(courses);
    return allCourses;
  }

  if (event.method === 'POST') {
    // Create a new course
    const body = await readBody(event);
    // Validasi sederhana, tambahkan validasi sesuai kebutuhan
    if (!body.title || !body.slug || !body.instructor_id) {
      return { error: 'title, slug, and instructor_id are required' };
    }
    const inserted = await db.insert(courses).values({
      title: body.title,
      slug: body.slug,
      description: body.description,
      thumbnail_url: body.thumbnail_url,
      instructor_id: body.instructor_id,
    }).returning();
    return inserted[0];
  }

  // Method not allowed
  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
});