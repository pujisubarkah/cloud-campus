import { users } from '../../../database/users';
import { enrollments } from '../../../database/enrollment';
import { courses } from '../../../database/courses';
import { user_identity } from '../../../database/user_identity';
import { courseSections } from '../../../database/course_section';
import { db } from '../../../db';
import { eq, sql, desc } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  // Hanya GET untuk jumlah siswa
  // Tidak perlu POST
  const method = event.req.method;
    if (method === 'GET') {
      // Total siswa
      const siswaResult = await db
        .select({ total: sql<number>`COUNT(*)` })
        .from(users)
        .where(eq(users.role_id, 3));
      const total_siswa = siswaResult[0]?.total ?? 0;

      // Total instruktur
      const instrukturResult = await db
        .select({ total: sql<number>`COUNT(*)` })
        .from(users)
        .where(eq(users.role_id, 2));
      const total_instruktur = instrukturResult[0]?.total ?? 0;

      // Total kursus
      const courseResult = await db
        .select({ total: sql<number>`COUNT(*)` })
        .from(courses);
      const total_course = courseResult[0]?.total ?? 0;

      // Total content (section)
      const contentResult = await db
        .select({ total: sql<number>`COUNT(*)` })
        .from(courseSections);
      const total_content = contentResult[0]?.total ?? 0;

      return { total_siswa, total_instruktur, total_course, total_content };
  }
  return { error: 'Method not allowed' };
});
