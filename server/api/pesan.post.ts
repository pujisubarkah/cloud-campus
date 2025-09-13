import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Validasi sederhana
  if (!body.name || !body.email || !body.message) {
    return { success: false, error: 'Semua field wajib diisi.' }
  }
  // Simpan ke database, kirim email, dsb. (contoh: log saja)
  console.log('Pesan masuk:', body)
  // Balasan sukses
  return { success: true, message: 'Pesan berhasil diterima.' }
})
