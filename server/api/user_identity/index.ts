import { eq, and } from 'drizzle-orm';
import { db } from '@/server/db';
import { user_identity } from '../../database/user_identity';
import { readBody, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  if (event.method === 'GET') {
    const { user_id } = getQuery(event);
    let queryBuilder = db.select().from(user_identity);
    let rows;
    if (user_id) {
      rows = await db.select().from(user_identity).where(eq(user_identity.user_id, String(user_id)));
    } else {
      rows = await queryBuilder;
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
