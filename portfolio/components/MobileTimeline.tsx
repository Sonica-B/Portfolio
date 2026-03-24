'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ActiveSection } from '@/app/page'

interface MobileTimelineProps {
  onNavigate: (section: ActiveSection) => void
}

// Navigation button with gradient line and endpoints
function NavButton({
  label,
  onClick,
  gradient,
  delay,
  leftColor,
  rightColor
}: {
  label: string;
  onClick: () => void;
  gradient: string;
  delay: number;
  leftColor: string;
  rightColor: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 100 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex flex-col items-center gap-1.5"
    >
      <span className="text-gray-300 text-sm font-medium">
        {label}
      </span>
      <div className="relative flex items-center w-24">
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: leftColor }} />
        <div className={`flex-1 h-[2px] bg-gradient-to-r ${gradient}`} />
        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: rightColor }} />
      </div>
    </motion.button>
  )
}

export default function MobileTimeline({ onNavigate }: MobileTimelineProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.97])

  return (
    <motion.div
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Neural Network Background is rendered at page level (page.tsx) */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-6 pb-6">
        {/* Large Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 60 }}
          className="text-center"
        >
          <h1 className="text-[3.2rem] font-bold text-white leading-[0.95] tracking-tight" style={{ fontStyle: 'italic' }}>
            SHREYA
          </h1>
          <h1 className="text-[3.2rem] font-bold text-white leading-[0.95] tracking-tight" style={{ fontStyle: 'italic' }}>
            BOYANE
          </h1>
          {/* AI/ML Engineer Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mt-2"
          >
            <span
              className="text-sm font-medium tracking-[0.25em] uppercase"
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #a855f7 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
              }}
            >
              AI/ML Engineer
            </span>
          </motion.div>
        </motion.div>

        {/* Profile Picture with fade effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 60 }}
          className="relative flex justify-center mt-1"
        >
          <div className="relative w-full h-[420px]">
            {/* Image container with gradient mask for fade effect */}
            <div
              className="relative w-full h-full"
              style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 95%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 65%, transparent 95%)',
              }}
            >
              <Image
                src="/Shreya.png"
                alt="Shreya Boyane"
                fill
                className="object-contain"
                style={{ objectPosition: 'center 20%' }}
                sizes="(max-width: 768px) 100vw, 0px"
              />
            </div>

            {/* Location Badge */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 py-1.5 rounded-full z-10"
              style={{
                background: 'rgba(30, 30, 30, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-xs text-gray-200">Worcester, MA</span>
              <span className="text-gray-500">|</span>
              <span className="text-xs text-gray-400">WPI MS in AI</span>
            </div>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-center text-gray-400 text-sm leading-relaxed max-w-[320px] mx-auto mb-5"
        >
          Building production-grade Agentic AI workflows, LLM systems, &amp; Computer Vision solutions.
        </motion.p>

        {/* Contact Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex justify-center gap-3 mb-6"
        >
          {[
            { href: 'mailto:shreyaa.boyane@gmail.com', icon: 'mail' },
            { href: 'https://zcal.co/i/4aMYgoRr', icon: 'calendar' },
            { href: 'https://github.com/Sonica-B', icon: 'github' },
            { href: 'https://linkedin.com/in/shreya-boyane', icon: 'linkedin' },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.08, type: 'spring' }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {item.icon === 'mail' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              )}
              {item.icon === 'calendar' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              )}
              {item.icon === 'github' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              )}
              {item.icon === 'linkedin' && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              )}
            </motion.a>
          ))}
        </motion.div>

        {/* Spacer */}
        <div className="flex-1 min-h-[20px]" />

        {/* Navigation Grid - 3 top + 2 bottom */}
        <div className="flex flex-col items-center gap-5">
          <div className="grid grid-cols-3 gap-x-4">
            <NavButton
              label="Experience"
              onClick={() => onNavigate('experience')}
              gradient="from-gray-500 to-gray-600"
              leftColor="#6b7280"
              rightColor="#4b5563"
              delay={0.6}
            />
            <NavButton
              label="Projects"
              onClick={() => onNavigate('projects')}
              gradient="from-purple-500 to-pink-500"
              leftColor="#a855f7"
              rightColor="#ec4899"
              delay={0.7}
            />
            <NavButton
              label="Skills"
              onClick={() => onNavigate('skills')}
              gradient="from-cyan-400 to-cyan-500"
              leftColor="#22d3ee"
              rightColor="#06b6d4"
              delay={0.8}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-6">
            <NavButton
              label="Awards"
              onClick={() => onNavigate('achievements')}
              gradient="from-yellow-400 to-orange-500"
              leftColor="#facc15"
              rightColor="#f97316"
              delay={0.9}
            />
            <NavButton
              label="About Me"
              onClick={() => onNavigate('about')}
              gradient="from-cyan-400 to-teal-400"
              leftColor="#22d3ee"
              rightColor="#2dd4bf"
              delay={1.0}
            />
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1 text-gray-600"
          >
            <span className="text-[10px] tracking-widest uppercase">Scroll to explore</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
