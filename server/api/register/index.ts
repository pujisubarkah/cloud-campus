import { db } from '~/server/db'
import { users } from '~/server/database/users'
import { H3Event } from 'h3'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { sendVerificationEmail } from '~/server/utils/sendVerificationEmail'

// Define the expected request body structure
interface RegisterRequest {
  email: string
  password: string
  full_name: string
  nip?: string
  avatar_seed?: string
}

export default defineEventHandler(async (event: H3Event) => {
  // Only allow POST method
  if (event.method !== 'POST') {
    return {
      success: false,
      message: 'Method not allowed'
    }
  }

  try {
    // Get request body
    const body = await readBody<RegisterRequest>(event)

    // Validate required fields
    if (!body.email || !body.password || !body.full_name) {
      return {
        success: false,
        message: 'Email, password, and full name are required'
      }
    }

    // Check if email already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, body.email))
      .limit(1)

    if (existingUser.length > 0) {
      return {
        success: false,
        message: 'Email already registered'
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(body.password, salt)

    // Create new user
    const newUser = await db.insert(users).values({
      email: body.email,
      password_hash: hashedPassword,
      full_name: body.full_name,
      nip: body.nip || null,
      avatar_seed: body.avatar_seed || null,
      role: 'user',
      role_id: 3, // Default role_id for regular users
      is_active: true,
      is_verified: false // default belum terverifikasi
    })
    .returning({
      id: users.id,
      email: users.email,
      full_name: users.full_name,
      nip: users.nip,
      role: users.role,
      created_at: users.created_at
    })

    // Tidak kirim email verifikasi di sini

    return {
      success: true,
      message: 'Registration successful. Menunggu persetujuan admin.',
      user: newUser[0]
    }

  } catch (error) {
    console.error('Registration error:', error)
    // Handle unique constraint violation
    if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === '23505') {
      return {
        success: false,
        message: 'Email already registered'
      }
    }
    return {
  success: false,
  message: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : 'Failed to register user'
    }
  }
})