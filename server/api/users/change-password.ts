import { db } from '../../db';
import { users } from '../../database/users';
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  if (event.req.method !== 'POST') {
    return { status: 405, message: 'Method Not Allowed' }
  }

  // Ambil user dari context (hasil autentikasi token)
  const currentUser = event.context.user
  if (!currentUser || !currentUser.id) {
    return { status: 401, message: 'Unauthorized' }
  }

  const body = await readBody(event)
  const { old_password, new_password } = body

  if (!old_password || !new_password) {
    return { status: 400, message: 'Data tidak lengkap.' }
  }

  // Cari user
  const user = await db.select().from(users).where(eq(users.id, currentUser.id)).limit(1)
  if (!user || user.length === 0) {
    return { status: 404, message: 'User tidak ditemukan.' }
  }

  const userData = user[0]

  // Cek password lama
  const match = await bcrypt.compare(old_password, userData.password_hash)
  if (!match) {
    return { status: 401, message: 'Password lama salah.' }
  }

  // Hash password baru
  const hashedPassword = await bcrypt.hash(new_password, 10)

  // Update password di database
  await db.update(users)
    .set({ password_hash: hashedPassword })
    .where(eq(users.id, currentUser.id))

  return { status: 200, message: 'Password berhasil diganti.' }
})
