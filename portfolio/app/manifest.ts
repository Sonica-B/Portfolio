import type { MetadataRoute } from 'next'
import { profile } from '@/lib/content'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.identity.name,
    short_name: 'Shreya',
    description: profile.identity.headline,
    start_url: '/',
    display: 'standalone',
    background_color: '#121218',
    theme_color: '#121218',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
