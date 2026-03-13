/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    // Allow images from any HTTPS source (covers CDNs, Google Drive, etc.)
    // When deploying, replace with specific domains for tighter security:
    // domains: ['res.cloudinary.com', 'storage.googleapis.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Auto-generate WebP + AVIF for browsers that support it
    formats: ['image/avif', 'image/webp'],
    // Reasonable sizes for medical site photos
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [64, 128, 256, 400, 512],
  },
}

module.exports = nextConfig
