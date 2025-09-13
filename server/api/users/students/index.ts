import { users } from '../../../database/users';
import { enrollments } from '../../../database/enrollment';
import { courses } from '../../../database/courses';
import { user_identity } from '../../../database/user_identity';
import { db } from '../../../db';
import { eq, sql, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const body = method === 'POST' ? await readBody(event) : null;

  if (method === 'GET') {
    // Get students with count of enrolled courses
    const studentsWithCourseCount = await db
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
        foto_url: user_identity.foto_url
      })
      .from(users)
      .leftJoin(enrollments, eq(users.id, enrollments.user_id))
      .leftJoin(user_identity, eq(users.id, user_identity.user_id))
      .where(eq(users.role_id, 3))
      .groupBy(users.id, user_identity.foto_url)
      .orderBy(desc(sql`COUNT(${enrollments.course_id})`));

    return { users: studentsWithCourseCount };
  }

  if (method === 'POST') {
    // Create new user
    const newUser = await db.insert(users).values(body).returning();
    return { user: newUser[0] };
  }

  return { error: 'Method not allowed' };
});
