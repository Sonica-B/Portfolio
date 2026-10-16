import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 448 and 512 sit between the default 384 and the 640 device size, so a phone hero portrait
  // (about 390 px wide at 1.75x) fetches a 448 px file instead of jumping to 640.
  images: { formats: ['image/avif', 'image/webp'], imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 448, 512] },
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
      {
        source: '/(.*)\.(jpg|jpeg|png|gif|svg|webp|avif|mp4|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
