import { auth } from '@/server/auth'
import { db } from '@/server/db'
import { users } from '@/server/database/users'
import { readBody } from 'h3'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    const { email, password } = await readBody(event)

    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required'
      })
    }

    // Get user by email
    const usersResult = await db.select().from(users).where(eq(users.email, email));
    const user = usersResult[0];
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Verify password
    const isValidPassword = await auth.verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }

    // Generate token
    const token = auth.generateToken({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role_id: user.role_id
    })

    // Return user data WITH token
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role_id: user.role_id,
        avatar_seed: user.avatar_seed, // tambahkan ini
        token: token
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    throw error
  }
})
