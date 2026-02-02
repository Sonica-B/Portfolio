import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shreya Boyane | AI/ML Engineer',
  description: 'AI Engineer specializing in Agentic AI workflows, LLMs, and Computer Vision. MS in AI at WPI.',
  keywords: ['AI Engineer', 'Machine Learning', 'DevOps', 'LLMs', 'Computer Vision', 'Shreya Boyane'],
  authors: [{ name: 'Shreya Boyane' }],
  metadataBase: new URL('https://shreyaboyane.dev'),
  openGraph: {
    title: 'Shreya Boyane | AI/ML Engineer',
    description: 'AI Engineer specializing in Agentic AI workflows, LLMs, and Computer Vision.',
    url: 'https://shreyaboyane.dev',
    siteName: 'Shreya Boyane Portfolio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreya Boyane | AI/ML Engineer',
    description: 'AI Engineer specializing in Agentic AI workflows, LLMs, and Computer Vision.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
