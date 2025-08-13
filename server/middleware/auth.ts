import { auth } from '~/server/auth'

export default defineEventHandler(async (event) => {
  console.log('=== AUTH MIDDLEWARE CALLED ===')
  console.log('URL:', getRequestURL(event).pathname)
  console.log('Method:', event.method)

  // Skip auth untuk endpoint publik
  const url = getRequestURL(event)
  const publicPaths = [
    '/api/login',
    '/api/register',
    '/_nuxt',
    '/favicon.ico'
  ]
  
  // Skip middleware untuk path publik
  if (publicPaths.some(path => url.pathname.startsWith(path))) {
    console.log('⏭️ Skipping auth for public path:', url.pathname)
    return
  }

  // Ambil token dari header Authorization
  const authHeader = getHeader(event, 'authorization')
  console.log('Auth header:', authHeader)
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    console.log('Token found:', token.substring(0, 20) + '...')
    
    try {
      // Verifikasi token dan set user di context
      const user = auth.verifyToken(token)
      if (user) {
        event.context.user = user
        console.log('✅ User authenticated:', user.email)
      } else {
        console.log('❌ Token verification failed')
        event.context.user = null
      }
    } catch (error) {
      console.error('❌ Token verification error:', error)
      event.context.user = null
    }
  } else {
    console.log('⚠️ No Bearer token found')
    event.context.user = null
  }
  
  console.log('Final context user:', event.context.user)
  console.log('=== END AUTH MIDDLEWARE ===')
})