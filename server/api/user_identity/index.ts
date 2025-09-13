import { eq, and, count } from 'drizzle-orm';
import { db } from '@/server/db';
import { user_identity } from '../../database/user_identity';
import { users } from '../../database/users';
import { enrollments } from '../../database/enrollment';
import { readBody, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const { user_id } = getQuery(event);
    let rows;
    if (user_id) {
      // Get identity + user info
      rows = await db
        .select({
          id: user_identity.id,
          user_id: user_identity.user_id,
          unit_kerja: user_identity.unit_kerja,
          jabatan: user_identity.jabatan,
          pangkat_golongan: user_identity.pangkat_golongan,
          foto_url: user_identity.foto_url,
          created_at: user_identity.created_at,
          updated_at: user_identity.updated_at,
          email: users.email,
          full_name: users.full_name,
          nip: users.nip
        })
        .from(user_identity)
        .leftJoin(users, eq(user_identity.user_id, users.id))
        .where(eq(user_identity.user_id, String(user_id)));

      // Get total enrolled courses
      const totalCourses = await db
        .select({ count: count() })
        .from(enrollments)
        .where(eq(enrollments.user_id, String(user_id)));
      // Attach total_courses to each row
      rows = rows.map(row => ({ ...row, total_courses: totalCourses[0]?.count ?? 0 }));
    } else {
      type RowWithTotalCourses = {
        id: string;
        user_id: string;
        unit_kerja: string | null;
        jabatan: string | null;
        pangkat_golongan: string | null;
        foto_url: string | null;
        created_at: Date | null;
        updated_at: Date | null;
        email: string | null;
        full_name: string | null;
        nip: string | null;
        total_courses: number;
      };

      const rawRows = await db
        .select({
          id: user_identity.id,
          user_id: user_identity.user_id,
          unit_kerja: user_identity.unit_kerja,
          jabatan: user_identity.jabatan,
          pangkat_golongan: user_identity.pangkat_golongan,
          foto_url: user_identity.foto_url,
          created_at: user_identity.created_at,
          updated_at: user_identity.updated_at,
          email: users.email,
          full_name: users.full_name,
          nip: users.nip
        })
        .from(user_identity)
        .leftJoin(users, eq(user_identity.user_id, users.id));
      // For all users, attach total_courses
      const rows: RowWithTotalCourses[] = [];
      for (const row of rawRows) {
        const totalCourses = await db
          .select({ count: count() })
          .from(enrollments)
          .where(eq(enrollments.user_id, String(row.user_id)));
        rows.push({ ...row, total_courses: totalCourses[0]?.count ?? 0 });
      }
    }
    return { success: true, data: rows };
  }

  if (event.method === 'POST') {
    const body = await readBody(event);
    const { user_id, unit_kerja, jabatan, pangkat_golongan, foto_url } = body;
    if (!user_id) {
      return { success: false, message: 'user_id wajib diisi' };
    }
    const result = await db.insert(user_identity).values({
      user_id,
      unit_kerja,
      jabatan,
      pangkat_golongan,
      foto_url,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return { success: true, result };
  }

  return { error: 'Method not allowed' };
});
