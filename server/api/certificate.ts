import { courses } from '@/server/database/courses'
import { courseProgress } from '@/server/database/course_progress'
import { db } from '@/server/db'
import { users } from '@/server/database/users'
import { H3Event } from 'h3'
import { eq, and } from 'drizzle-orm'
import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event: H3Event) => {
  try {
    console.log('--- Certificate API called ---');
    if (event.method !== 'GET') {
      console.log('Method not allowed:', event.method);
      throw createError({
        statusCode: 405,
        message: 'Method not allowed'
      })
    }

    const authHeader = event.req.headers['authorization']
    console.log('Auth header:', authHeader);
    if (!authHeader) {
      console.log('No Authorization header');
      throw createError({ statusCode: 401, message: 'Unauthorized' })
    }
    const token = authHeader.replace('Bearer ', '')
    let userId = null;
    try {
      userId = decodeUserIdFromToken(token)
      console.log('Decoded userId:', userId);
    } catch (err) {
      console.log('Error decoding token:', err);
      throw createError({ statusCode: 401, message: 'Invalid token' })
    }

    const courseSlug = getQuery(event).slug
    console.log('Course slug:', courseSlug);
    if (!courseSlug) {
      console.log('No course slug');
      throw createError({ statusCode: 400, message: 'Course slug is required' })
    }

    const courseRes = await db.select().from(courses).where(eq(courses.slug, String(courseSlug))).limit(1)
    console.log('Course result:', courseRes);
    if (!courseRes[0]) {
      console.log('Course not found');
      throw createError({ statusCode: 404, message: 'Course not found' })
    }
    const courseId = courseRes[0].id

    const progress = await db.select().from(courseProgress)
      .where(and(eq(courseProgress.user_id, String(userId)), eq(courseProgress.course_id, String(courseId))))
      .limit(1)
    console.log('Progress:', progress);
    if (!progress || !progress[0] || (progress[0].progress_percent ?? 0) < 100) {
      console.log('Course not completed or progress < 100');
      throw createError({ statusCode: 403, message: 'Course not completed' })
    }

    const userRes = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    console.log('User result:', userRes);
    const userName = userRes[0]?.full_name || 'Peserta'
    const courseTitle = courseRes[0]?.title || 'Kursus'
    const date = new Date().toLocaleDateString('id-ID')

    const templatePath = path.join(process.cwd(), 'public', 'certificate_template.png')
    const outputFile = `certificate-${userId}-${courseSlug}.png`
    const outputPath = path.join(process.cwd(), 'public', 'certificates', outputFile)
    console.log('Template path:', templatePath);
    console.log('Output path:', outputPath);

    try {
      await sharp(templatePath)
        .composite([
          {
            input: Buffer.from(
              `<svg width="1200" height="900">
                <text x="600" y="400" font-size="48" font-family="Arial, sans-serif" text-anchor="middle" fill="#222">${userName}</text>
                <text x="600" y="480" font-size="32" font-family="Arial, sans-serif" text-anchor="middle" fill="#222">${courseTitle}</text>
                <text x="600" y="560" font-size="28" font-family="Arial, sans-serif" text-anchor="middle" fill="#222">${date}</text>
              </svg>`
            ),
            top: 0,
            left: 0
          }
        ])
        .png()
        .toFile(outputPath)
      console.log('Certificate generated successfully');
    } catch (err) {
      console.log('Error generating certificate:', err);
      throw createError({ statusCode: 500, message: 'Failed to generate certificate' })
    }

    return {
      success: true,
      message: 'Certificate generated',
      certificateUrl: `/certificates/${outputFile}`
    }
  } catch (err) {
    console.log('Certificate API error:', err);
    throw err;
  }
})

// Dummy function for JWT decoding
function decodeUserIdFromToken(token: string): string {
  try {
    const secret = process.env.SECRET_KEY || 'your-secret-key';
    const payload = jwt.verify(token, secret) as any;
    return payload.id;
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Invalid token' });
  }
}
