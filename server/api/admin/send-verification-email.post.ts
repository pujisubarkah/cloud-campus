import { db } from '~/server/db'
import { users } from '~/server/database/users'
import { sendVerificationEmail } from '~/server/utils/sendVerificationEmail'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  // Only allow POST
  if (event.method !== 'POST') {
    return { success: false, message: 'Method not allowed' }
  }

  try {
    const body = await readBody(event)
    const userId = body.userId
    if (!userId) {
      return { success: false, message: 'User ID required' }
    }

    // Find user
    const userArr = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (userArr.length === 0) {
      return { success: false, message: 'User not found' }
    }
    const user = userArr[0]

    // Only send if not verified
    if (user.is_verified) {
      return { success: false, message: 'User already verified' }
    }

    // Send verification email
    const verificationUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/verify?id=${user.id}`
    await sendVerificationEmail({
      to: user.email,
      name: user.full_name,
      verificationUrl
    })

    return { success: true, message: 'Verification email sent.' }
  } catch (error) {
    return { success: false, message: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Failed to send verification email' }
  }
})
