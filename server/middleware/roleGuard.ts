import { getRequestURL } from 'h3'

// roleMap: path -> allowed role_ids
const roleMap: Record<string, number[]> = {
  '/admin': [1], // hanya role_id 1 (admin)
  '/instructor': [2], // hanya role_id 2 (instruktur)
  '/student': [3], // hanya role_id 3 (siswa)
  // tambahkan path lain sesuai kebutuhan
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const path = url.pathname
  // Cari path yang cocok
  const matched = Object.keys(roleMap).find(p => path.startsWith(p))
  if (!matched) return // path tidak dibatasi role

  const user = event.context.user
  if (!user || typeof user.role_id !== 'number') {
    return { statusCode: 401, body: 'Unauthorized: user not found' }
  }
  if (!roleMap[matched].includes(user.role_id)) {
    return { statusCode: 403, body: 'Forbidden: role not allowed' }
  }
})
