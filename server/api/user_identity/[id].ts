import { eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { user_identity } from '../../database/user_identity';
import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  if (!id) {
    return { error: 'user_identity id wajib diisi di URL' };
  }

  if (event.method === 'GET') {
    // Ambil satu row user_identity by id
    const row = await db.select().from(user_identity).where(eq(user_identity.id, String(id)));
    return { success: true, data: row[0] || null };
  }

  if (event.method === 'PUT') {
    // Update data user_identity
    const body = await readBody(event);
    const { unit_kerja, jabatan, pangkat_golongan, foto_url } = body;
    const updated = await db.update(user_identity)
      .set({
        unit_kerja,
        jabatan,
        pangkat_golongan,
        foto_url,
        updated_at: new Date(),
      })
      .where(eq(user_identity.id, String(id)))
      .returning();
    return { success: true, data: updated[0] || null };
  }

  if (event.method === 'DELETE') {
    // Hapus row user_identity by id
    await db.delete(user_identity).where(eq(user_identity.id, String(id)));
    return { success: true };
  }

  return { error: 'Method not allowed' };
});
