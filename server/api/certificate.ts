import { courses } from '@/server/database/courses'
import { courseProgress } from '@/server/database/course_progress'
import { courseSections } from '@/server/database/course_section'
import { db } from '@/server/db'
import { users } from '@/server/database/users'
import { H3Event } from 'h3'
import { eq, and, isNull, isNotNull, gte } from 'drizzle-orm'
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

    const courseId = getQuery(event).slug
    console.log('Course id:', courseId);
    if (!courseId) {
      console.log('No course id');
      throw createError({ statusCode: 400, message: 'Course id is required' })
    }

    const courseRes = await db.select().from(courses).where(eq(courses.id, String(courseId))).limit(1)
    console.log('Course result:', courseRes);
    if (!courseRes[0]) {
      console.log('Course not found');
      throw createError({ statusCode: 404, message: 'Course not found' })
    }
    // courseId sudah didapat dari parameter

    // Cek progress total course
    const totalProgress = await db.select().from(courseProgress)
      .where(and(eq(courseProgress.user_id, String(userId)), eq(courseProgress.course_id, String(courseId)), isNull(courseProgress.section_id)))
      .limit(1)
    console.log('Total Progress:', totalProgress);

    let isCourseCompleted = false;
    if (totalProgress[0] && (totalProgress[0].progress_percent ?? 0) >= 100) {
      isCourseCompleted = true;
    } else {
      // Jika tidak ada baris total, cek semua section
      const allSections = await db.select().from(courseSections)
        .where(eq(courseSections.course_id, String(courseId)))
      const sectionIds = allSections.map(s => s.id)
      const completedSections = await db.select().from(courseProgress)
        .where(and(eq(courseProgress.user_id, String(userId)), eq(courseProgress.course_id, String(courseId)), isNotNull(courseProgress.section_id), gte(courseProgress.progress_percent, 100)))
      const completedSectionIds = completedSections.map(s => s.section_id)
      isCourseCompleted = sectionIds.length > 0 && sectionIds.every(id => completedSectionIds.includes(id))
    }
    if (!isCourseCompleted) {
      console.log('Course not completed (all sections not finished)');
      throw createError({ statusCode: 403, message: 'Course not completed' })
    }

    const userRes = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    console.log('User result:', userRes);
    const userName = userRes[0]?.full_name || 'Peserta'
    const courseTitle = courseRes[0]?.title || 'Kursus'
    const date = new Date().toLocaleDateString('id-ID')
    
    console.log('Certificate data:');
    console.log('- User name:', userName);
    console.log('- Course title:', courseTitle);
    console.log('- Date:', date);

    const templatePath = path.join(process.cwd(), 'public', 'certificate_template.png')
  const outputFile = `certificate-${userId}-${courseId}.png`
    const outputPath = path.join(process.cwd(), 'public', 'certificates', outputFile)
    console.log('Template path:', templatePath);
    console.log('Output path:', outputPath);

    try {
      const svgOverlay = `
        <svg width="4000" height="2828" xmlns="http://www.w3.org/2000/svg">
          <!-- Judul SERTIFIKAT -->
          <text x="2000" y="600"
                font-family="Georgia, serif" font-size="240" font-weight="bold"
                text-anchor="middle" fill="#2c3e50" letter-spacing="12">
            SERTIFIKAT
          </text>

          <!-- Subjudul -->
          <text x="2000" y="800"
                font-family="Arial, sans-serif" font-size="80" font-style="italic"
                text-anchor="middle" fill="#7f8c8d">
            Dengan ini diberikan kepada
          </text>

          <!-- Nama Peserta -->
          <text x="2000" y="1130"
                font-family="Georgia, serif" font-size="160" font-weight="bold"
                text-anchor="middle" fill="#2c3e50">
            ${userName}
          </text>

          <!-- Keterangan -->
          <text x="2000" y="1360"
                font-family="Arial, sans-serif" font-size="66"
                text-anchor="middle" fill="#7f8c8d">
            Atas partisipasinya dalam menyelesaikan kursus
          </text>

          <!-- Judul Kursus -->
          <text x="2000" y="1600"
                font-family="Georgia, serif" font-size="106" font-weight="bold" font-style="italic"
                text-anchor="middle" fill="#2c3e50">
            "${courseTitle}"
          </text>

          <!-- Tanggal -->
          <text x="2000" y="1930"
                font-family="Arial, sans-serif" font-size="66"
                text-anchor="middle" fill="#7f8c8d">
            Diberikan pada tanggal ${date}
          </text>

          <!-- Signature area kiri -->
          <text x="1000" y="2330"
                font-family="Arial, sans-serif" font-size="53"
                text-anchor="middle" fill="#34495e">
            Deputi Bidang Transformasi Pembelajaran ASN
          </text>
          <line x1="666" y1="2400" x2="1333" y2="2400" stroke="#34495e" stroke-width="6"/>

          <!-- Signature area kanan -->
          <text x="3000" y="2330"
                font-family="Arial, sans-serif" font-size="53"
                text-anchor="middle" fill="#34495e">
            Kepala LAN
          </text>
          <line x1="2833" y1="2400" x2="3166" y2="2400" stroke="#34495e" stroke-width="6"/>
        </svg>
      `;

      await sharp(templatePath)
        .composite([
          {
            input: Buffer.from(svgOverlay),
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
    const secret = process.env.JWT_SECRET || 'your-default-secret-key';
    const payload = jwt.verify(token, secret) as any;
    return payload.id;
  } catch (err) {
    throw createError({ statusCode: 401, message: 'Invalid token' });
  }
}
