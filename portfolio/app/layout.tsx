import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], display: 'swap', variable: '--font-inter' })

const SITE_URL = 'https://shreyaboyane.dev'
const FULL_NAME = 'Shreya Boyane'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shreya Boyane | AI/ML Engineer - Agentic AI, LLMs & Computer Vision',
    template: '%s | Shreya Boyane',
  },
  description:
    'Shreya Boyane is an AI/ML Engineer specializing in production-grade Agentic AI workflows, LLM systems, and Computer Vision solutions. MS in Artificial Intelligence at Worcester Polytechnic Institute (WPI).',
  keywords: [
    'Shreya Boyane',
    'AI Engineer',
    'ML Engineer',
    'Machine Learning Engineer',
    'Agentic AI',
    'LLM',
    'Large Language Models',
    'Computer Vision',
    'Artificial Intelligence',
    'WPI',
    'Worcester Polytechnic Institute',
    'AI Developer',
    'Deep Learning',
    'NLP',
    'Python',
    'Multi-Agent AI',
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shreya Boyane | AI/ML Engineer',
    description:
      'AI/ML Engineer building production-grade Agentic AI workflows, LLM systems, and Computer Vision solutions. MS in AI at WPI.',
    url: SITE_URL,
    siteName: 'Shreya Boyane - AI/ML Engineer Portfolio',
    type: 'profile',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Shreya Boyane - AI/ML Engineer specializing in Agentic AI, LLMs & Computer Vision',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreya Boyane | AI/ML Engineer',
    description:
      'AI/ML Engineer building production-grade Agentic AI workflows, LLM systems, and Computer Vision solutions.',
    images: [
      {
        url: '/og-image.jpg',
        alt: 'Shreya Boyane - AI/ML Engineer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your Google Search Console verification code here once you have it
    // google: 'your-verification-code',
  },
  category: 'technology',
  classification: 'Portfolio',
}

// Comprehensive Person schema for Google Knowledge Panel
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Shreya Boyane',
  givenName: 'Shreya',
  familyName: 'Boyane',
  url: SITE_URL,
  image: `${SITE_URL}/Shreya.png`,
  description:
    'AI/ML Engineer specializing in production-grade Agentic AI workflows, LLM systems, and Computer Vision solutions. Former Lead DevOps Engineer with expertise in CI/CD, MLOps, and scalable AI systems.',
  jobTitle: 'Machine Learning Engineer',
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Agentic AI Workflows',
    'Large Language Models',
    'Computer Vision',
    'Deep Learning',
    'Natural Language Processing',
    'Multi-Agent AI Systems',
    'Python',
    'PyTorch',
    'TensorFlow',
    'DevOps',
    'CI/CD Pipelines',
    'MLOps',
    'Brain-Computer Interfaces',
    'Docker',
    'Kubernetes',
    'AWS',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Worcester Polytechnic Institute',
      alternateName: 'WPI',
      url: 'https://www.wpi.edu',
      sameAs: 'https://en.wikipedia.org/wiki/Worcester_Polytechnic_Institute',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'PES Modern College of Engineering',
      alternateName: 'PES MCOE',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Pune',
        addressCountry: 'IN',
      },
    },
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Master of Science in Artificial Intelligence',
      credentialCategory: 'degree',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'Worcester Polytechnic Institute',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Bachelor of Engineering in Information Technology',
      credentialCategory: 'degree',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'PES Modern College of Engineering',
      },
    },
  ],
  award: [
    'Top Talent Award - DevOps Excellence, Persistent Systems',
    'Data Science GQP MVP - Best Qualifying Project, WPI',
    'Bravo Individual Award - Persistent Systems',
    'Team Excellence Award FY2023 - Persistent Systems',
    'Bravo Team Award - Persistent Systems',
    'Best Intern Award - Top among 20,000+ new joiners, Persistent Systems',
    '1st Rank - Yantra-Maan Robotics, Xtronica Mpulse 2018',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Worcester',
    addressRegion: 'MA',
    addressCountry: 'US',
  },
  nationality: {
    '@type': 'Country',
    name: 'India',
  },
  knowsLanguage: ['English', 'Hindi', 'Marathi'],
  sameAs: [
    'https://www.linkedin.com/in/shreya-boyane/',
    'https://github.com/Sonica-B',
    'https://orcid.org/0009-0004-1211-3253',
    'https://www.wikidata.org/wiki/Q138034331',
    'https://g.dev/shreyaboyane',
    'https://dev.to/sonicab',
  ],
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': SITE_URL,
  },
}

// WebSite schema for sitelinks search box
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'Shreya Boyane - AI/ML Engineer Portfolio',
  url: SITE_URL,
  description:
    'Official portfolio of Shreya Boyane, AI/ML Engineer specializing in Agentic AI, LLMs, and Computer Vision.',
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
}

// ProfilePage schema — tells Google this page IS about Shreya
const profilePageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/#profilepage`,
  name: 'Shreya Boyane | AI/ML Engineer',
  url: SITE_URL,
  mainEntity: {
    '@id': `${SITE_URL}/#person`,
  },
  dateCreated: '2024-12-01',
  dateModified: new Date().toISOString().split('T')[0],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Favicon set */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#000000" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Geo tags for local SEO */}
        <meta name="geo.region" content="US-MA" />
        <meta name="geo.placename" content="Worcester" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-black focus:rounded-lg focus:text-sm focus:font-medium">Skip to content</a>
        <noscript>
          <div style={{ padding: '2rem', textAlign: 'center', color: '#f5f5f7', background: '#000', minHeight: '100vh' }}>
            <h1>Shreya Boyane — AI/ML Engineer</h1>
            <p>This portfolio requires JavaScript to display interactive content.</p>
            <p>Contact: <a href="mailto:shreyaa.boyane@gmail.com" style={{ color: '#00d4ff' }}>shreyaa.boyane@gmail.com</a></p>
            <p><a href="https://linkedin.com/in/shreya-boyane" style={{ color: '#00d4ff' }}>LinkedIn</a> | <a href="https://github.com/Sonica-B" style={{ color: '#00d4ff' }}>GitHub</a></p>
          </div>
        </noscript>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
