import ImageKit from 'imagekit'

// Check if all required environment variables are present
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

if (!publicKey || !privateKey || !urlEndpoint) {
  console.warn('ImageKit environment variables are not configured. Image upload functionality will be disabled.')
}

export const imagekit = new ImageKit({
  publicKey: publicKey || 'dummy_public_key',
  privateKey: privateKey || 'dummy_private_key',
  urlEndpoint: urlEndpoint || 'https://dummy.imagekit.io',
})
