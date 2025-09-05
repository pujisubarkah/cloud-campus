import { db } from '~/server/db'
import { notifikasi } from '~/server/database/notifikasi'
import { users } from '~/server/database/users'
import { sql } from 'drizzle-orm'
import { H3Event, readBody } from 'h3'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event: H3Event) => {
  if (event.method === 'GET') {
    // Ambil semua notifikasi dengan nama penerima dan pengirim
    const allNotif = await db
      .select({
        id: notifikasi.id,
        pesan: notifikasi.pesan,
        dibaca: notifikasi.dibaca,
        recipient_full_name: users.full_name,
        sender_full_name: sql`(SELECT full_name FROM users WHERE users.id = ${notifikasi.created_by})`
      })
      .from(notifikasi)
      .leftJoin(users, eq(notifikasi.user_id, users.id));

    return allNotif.map(n => ({
      id: n.id,
      pesan: n.pesan,
      dibaca: n.dibaca,
      recipient_full_name: n.recipient_full_name,
      sender_full_name: n.sender_full_name
    }));
  }

  if (event.method === 'POST') {
    const body = await readBody(event)
    if (!body.user_id || !body.pesan || !body.created_by) {
      return { error: 'user_id, pesan, dan created_by wajib diisi' }
    }
    const inserted = await db.insert(notifikasi).values({
      user_id: body.user_id,
      pesan: body.pesan,
      dibaca: body.dibaca ?? false,
      created_by: body.created_by,
    }).returning()
    return inserted[0]
  }

  event.res.statusCode = 405
  return { error: 'Method not allowed' }
})