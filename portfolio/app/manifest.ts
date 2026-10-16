import type { MetadataRoute } from 'next'
import { profile } from '@/lib/content'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.identity.name,
    short_name: 'Shreya',
    description: profile.identity.headline,
    start_url: '/',
    display: 'standalone',
    // Hex twin of --surface in globals.css (oklch(0.13 0.02 255)).
    background_color: '#03080f',
    theme_color: '#03080f',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
