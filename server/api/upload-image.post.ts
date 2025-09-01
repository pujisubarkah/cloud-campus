import { imagekit } from '@/server/utils/imagekit'
import { v4 as uuidv4 } from 'uuid'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { file, fileName } = body // file base64, fileName optional

  if (!file) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  // Check if ImageKit is properly configured
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw createError({ 
      statusCode: 500, 
      statusMessage: 'ImageKit is not configured. Please set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, and IMAGEKIT_URL_ENDPOINT environment variables.' 
    })
  }

  try {
    const response = await imagekit.upload({
      file, // base64 atau link URL
      fileName: fileName || uuidv4(),
      folder: '/uploads',
    })

    return {
      success: true,
      url: response.url,
      fileId: response.fileId,
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    }
  }
})
