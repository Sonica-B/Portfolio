import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Shreya Boyane | AI/ML Engineer',
  description: 'AI Engineer specializing in Agentic AI workflows, LLMs, and Computer Vision. MS in AI at WPI.',
  keywords: ['AI Engineer', 'Machine Learning', 'DevOps', 'LLMs', 'Computer Vision', 'Shreya Boyane'],
  authors: [{ name: 'Shreya Boyane' }],
  openGraph: {
    title: 'Shreya Boyane | AI/ML Engineer',
    description: 'AI Engineer specializing in Agentic AI workflows, LLMs, and Computer Vision.',
    type: 'website',
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
