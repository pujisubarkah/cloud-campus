import { db } from '~/server/db'
import { notifikasi } from '~/server/database/notifikasi'
import { users } from '~/server/database/users'
import { sql } from 'drizzle-orm'
import { H3Event } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  const userId = event.context.params?.id
  if (!userId) {
    return { error: 'user_id wajib diisi' }
  }


  if (event.method === 'GET') {
    // Ambil semua notifikasi untuk user_id dengan nama penerima dan pengirim
    const notif = await db
      .select({
        id: notifikasi.id,
        pesan: notifikasi.pesan,
        dibaca: notifikasi.dibaca,
        recipient_full_name: users.full_name,
        sender_full_name: sql`(SELECT full_name FROM users WHERE users.id = ${notifikasi.created_by})`
      })
      .from(notifikasi)
      .leftJoin(users, eq(notifikasi.user_id, users.id))
      .where(eq(notifikasi.user_id, userId));
    return notif;
  }

  if (event.method === 'DELETE') {
    // Hapus notifikasi berdasarkan id
    const deleted = await db.delete(notifikasi).where(eq(notifikasi.id, userId)).returning();
    return deleted[0] || null;
  }

  // Method not allowed for other HTTP methods
  event.res.statusCode = 405;
  return { error: 'Method not allowed' };
}
);