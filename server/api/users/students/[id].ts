import { users } from '../../../database/users';
import { enrollments } from '../../../database/enrollment';
import { db } from '../../../db';
import { eq, and, sql } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  let id: string | undefined;
  if (event.context && event.context.params && event.context.params.id) {
    id = event.context.params.id;
  } else {
    // Fallback: extract id from URL if params not available
    const match = event.req.url?.match(/\/students\/(.+)$/);
    id = match ? match[1] : undefined;
  }
  const body = method === 'PUT' ? await readBody(event) : null;

  if (method === 'GET') {
    // Get single student with course count and foto_url
    if (!id) {
      return { error: 'No student id provided' };
    }
    const student = await db
      .select({
        id: users.id,
        email: users.email,
        full_name: users.full_name,
        role: users.role,
        role_id: users.role_id,
        nip: users.nip,
        is_active: users.is_active,
        avatar_seed: users.avatar_seed,
        is_verified: users.is_verified,
        created_at: users.created_at,
        total_courses: sql<number>`COUNT(${enrollments.course_id})`.as('total_courses'),
        foto_url: sql<string>`(SELECT foto_url FROM user_identity WHERE user_identity.user_id = ${users.id} LIMIT 1)`
      })
      .from(users)
      .leftJoin(enrollments, eq(users.id, enrollments.user_id))
      .where(and(eq(users.role_id, 3), eq(users.id, id)))
      .groupBy(users.id);

    if (!student || student.length === 0) {
      return { error: 'Student not found' };
    }
    return { user: student[0] };
  }

  if (method === 'PUT') {
    // Update student
    if (!id) {
      return { error: 'No student id provided' };
    }
    const updated = await db.update(users).set(body).where(eq(users.id, id)).returning();
    if (!updated || updated.length === 0) {
      return { error: 'Student not found or not updated' };
    }
    return { user: updated[0] };
  }

  if (method === 'DELETE') {
    // Delete student
    if (!id) {
      return { error: 'No student id provided' };
    }
    const deleted = await db.delete(users).where(eq(users.id, id)).returning();
    if (!deleted || deleted.length === 0) {
      return { error: 'Student not found or not deleted' };
    }
    return { user: deleted[0] };
  }

  return { error: 'Method not allowed' };
});
