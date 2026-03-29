'use client'

import { useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ActiveSection } from '@/app/page'

const SoapBubbles3D = dynamic(() => import('./SoapBubbles3D'), {
  ssr: false,
  loading: () => null,
})

const LinkedInHighlights = dynamic(() => import('./LinkedInHighlights'), {
  ssr: false,
  loading: () => null,
})

const MobileTimeline = dynamic(() => import('./MobileTimeline'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

interface LandingPageProps {
  onNavigate: (section: ActiveSection) => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms — hero fades and scales as user scrolls past
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <div ref={heroRef} className="min-h-screen relative scroll-smooth size-lg">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="min-h-screen relative"
        >
          {/* Left Side Content - Desktop */}
          <div className="absolute left-8 md:left-16 top-[10%] md:top-[12%] z-30 max-w-lg">
            {/* Large Name */}
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
            >
              SHREYA
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
              className="text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
            >
              BOYANE
            </motion.h1>

            {/* Title and Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <h2 className="text-xl font-semibold text-white mb-2">
                AI/ML Engineer
              </h2>
              <p className="text-gray-400 text-base max-w-sm leading-relaxed">
                Building production-grade <span className="text-cyan-400">Agentic AI</span> workflows,
                <span className="text-purple-400"> LLM</span> systems, and <span className="text-cyan-400">Computer Vision</span> solutions.
              </p>
            </motion.div>

            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-xs text-gray-300">Worcester, MA</span>
                <span className="text-gray-600">|</span>
                <span className="text-xs text-gray-400">WPI MS in AI</span>
              </div>
            </motion.div>

            {/* Contact Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-5 flex gap-3"
            >
              <a href="mailto:shreyaa.boyane@gmail.com" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="https://zcal.co/i/4aMYgoRr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="Schedule a Meeting">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                  <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
                </svg>
              </a>
              <a href="https://github.com/Sonica-B" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/shreya-boyane/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://g.dev/shreyaboyane" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400/50 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="Google Developer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </a>
              <a href="https://dev.to/sonicab" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="Dev.to">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .67-.08.87-.25.21-.18.31-.5.31-.95v-1.97c0-.47-.12-.79-.34-.96zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.29 2.72 0 2.24-.04 2.37-.44 3.15zm4.38-1.98c0 1.07-.01 1.65-.03 1.72-.05.12-.22.29-.64.29-.42 0-.57-.17-.64-.29-.02-.07-.03-.65-.03-1.72V11.1c0-1.08.01-1.65.03-1.72.07-.12.22-.29.64-.29.42 0 .59.17.64.29.02.07.03.64.03 1.72v2.22z"/>
                </svg>
              </a>
            </motion.div>

            {/* LinkedIn Highlight - Latest Post */}
            <LinkedInHighlights />
          </div>

          {/* Profile Image - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, type: 'spring' }}
            className="absolute left-[38%] lg:left-[40%] bottom-0 z-20 pointer-events-none"
          >
            <Image
              src="/Shreya.png"
              alt="Shreya Boyane"
              width={600}
              height={800}
              className="object-contain"
              style={{
                height: '85vh',
                width: 'auto',
                filter: 'drop-shadow(0 0 30px rgba(0, 0, 0, 0.5))',
              }}
              priority
            />
          </motion.div>

          {/* Three.js Soap Bubbles - Desktop */}
          <Suspense fallback={null}>
            <SoapBubbles3D onNavigate={(section) => onNavigate(section as ActiveSection)} />
          </Suspense>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-gray-500"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile & Tablet Layout - Glassmorphic Vertical Timeline */}
      <div className="lg:hidden">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <MobileTimeline onNavigate={onNavigate} />
        </Suspense>
      </div>
    </div>
  )
}
