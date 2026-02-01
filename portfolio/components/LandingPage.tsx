'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
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

interface LandingPageProps {
  onNavigate: (section: ActiveSection) => void
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Left Side Content */}
      <div className="absolute left-8 md:left-16 top-[10%] md:top-[12%] z-20 max-w-lg">
        {/* Large Name */}
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
        >
          SHREYA
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight"
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
          <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
            AI/ML Engineer
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-sm leading-relaxed">
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
          <a href="tel:+17745199905" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-500/50 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="Phone">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </a>
          <a href="https://github.com/Sonica-B" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/shreya-boyane" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="/resume.pdf" target="_blank" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-out" title="Resume">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </a>
        </motion.div>

        {/* LinkedIn Highlight - Latest Post */}
        <LinkedInHighlights />

      </div>

      {/* Profile Image - Near info section, above neural animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, type: 'spring' }}
        className="absolute left-[35%] md:left-[38%] lg:left-[40%] bottom-0 z-20 pointer-events-none"
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


      {/* Three.js Soap Bubbles - Right Side */}
      <Suspense fallback={null}>
        <SoapBubbles3D onNavigate={(section) => onNavigate(section as ActiveSection)} />
      </Suspense>
    </motion.div>
  )
}
