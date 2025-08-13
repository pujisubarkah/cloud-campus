import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

interface AuthUser {
  id: string
  email: string
  full_name: string
  role_id: number
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key'

console.log('JWT_SECRET loaded:', JWT_SECRET ? 'Yes' : 'No')

export const auth = {
  // Generate JWT token
  generateToken(user: AuthUser): string {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role_id: user.role_id
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )
    console.log('Token generated for user:', user.email)
    return token
  },

  // Verify JWT token
  verifyToken(token: string): AuthUser | null {
    try {
      console.log('Verifying token with secret:', JWT_SECRET.substring(0, 10) + '...')
      const decoded = jwt.verify(token, JWT_SECRET) as any
      console.log('Token decoded successfully:', decoded.email)
      return {
        id: decoded.id,
        email: decoded.email,
        full_name: decoded.full_name,
        role_id: decoded.role_id
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('JWT verification error:', error.message)
      } else {
        console.error('JWT verification error:', error)
      }
      return null
    }
  },

  // Hash password
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12)
  },

  // Verify password
  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword)
  }
}