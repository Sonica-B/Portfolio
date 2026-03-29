'use client'

import { motion, useMotionValue, useTransform, animate, useSpring } from 'framer-motion'
import { useEffect, useRef, useCallback, type MouseEvent } from 'react'

// ─── Animated Counter ────────────────────────────────────────

function AnimatedCounter({ value, suffix = '', decimals = 0 }: {
  value: number; suffix?: string; decimals?: number
}) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString()
  )
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate(count, value, { duration: 2, ease: 'easeOut' })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, count])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  )
}

// ─── 3D Tilt Hook ────────────────────────────────────────────

function use3DTilt(intensity = 15) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * intensity)
    rotateY.set(x * intensity)
  }, [rotateX, rotateY, intensity])

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return { springX, springY, handleMove, handleLeave }
}

// ─── 3D Enamel Pin Badge (with real badge artwork) ───────────

function EnamelPinBadge({ badge, index }: {
  badge: { name: string; image?: string; icon?: React.ReactNode; color: string; borderColor: string; shadowColor: string; link?: string; noPinStyle?: boolean }
  index: number
}) {
  const { springX, springY, handleMove, handleLeave } = use3DTilt(25)
  const Wrapper = badge.link ? 'a' : 'div'
  const wrapperProps = badge.link ? { href: badge.link, target: '_blank' as const, rel: 'noopener noreferrer' } : {}

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 180 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 800 }}
      className={badge.link ? 'cursor-pointer' : 'cursor-default'}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.12, z: 30 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="relative"
      >
        <Wrapper {...wrapperProps} className="block">
        {badge.noPinStyle ? (
          /* Direct badge image — no circular container (e.g. hexagonal badges) */
          <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] flex items-center justify-center mx-auto">
            <img
              src={badge.image}
              alt={badge.name}
              className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-contain drop-shadow-lg"
              style={{ transform: 'translateZ(6px)' }}
            />
          </div>
        ) : (
          /* Pin body — circular badge */
          <div
            className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full flex items-center justify-center mx-auto"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${badge.color}, rgba(0,0,0,0.3))`,
              border: `3px solid ${badge.borderColor}`,
              boxShadow: `
                0 8px 24px ${badge.shadowColor},
                inset 0 2px 4px rgba(255,255,255,0.15),
                inset 0 -2px 4px rgba(0,0,0,0.2),
                0 2px 0 rgba(255,255,255,0.05)
              `,
              transform: 'translateZ(0)',
            }}
          >
            {/* Enamel gloss highlight */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)',
              }}
            />

            {/* Badge artwork (SVG image or icon) */}
            {badge.image ? (
              <img
                src={badge.image}
                alt={badge.name}
                className="w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-full object-cover"
                style={{ transform: 'translateZ(6px)' }}
              />
            ) : (
              <div
                className="w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] flex items-center justify-center"
                style={{ transform: 'translateZ(6px)' }}
              >
                {badge.icon}
              </div>
            )}

            {/* Pin clasp at top */}
            <div
              className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #d4d4d4, #a0a0a0)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.5)',
                transform: 'translateZ(10px)',
              }}
            />
          </div>
        )}

        {/* Name label below pin */}
        <p
          className="text-center text-[9px] sm:text-[10px] text-gray-400 mt-2 leading-tight max-w-[120px] mx-auto"
          style={{ transform: 'translateZ(2px)' }}
        >
          {badge.name}
        </p>

        {/* Floating shadow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-[70%] h-3 rounded-full -z-10"
          style={{
            background: badge.shadowColor,
            filter: 'blur(8px)',
            opacity: 0.5,
          }}
        />
        </Wrapper>
      </motion.div>
    </motion.div>
  )
}

// ─── 3D Certificate Card ─────────────────────────────────────

function CertificateCard3D({ award, icon, index }: {
  award: { title: string; subtitle: string; company: string; glowColor: string; iconColor: string }
  icon: React.ReactNode
  index: number
}) {
  const { springX, springY, handleMove, handleLeave } = use3DTilt(12)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ perspective: 800 }}
      className="cursor-default"
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.03, z: 30 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative group"
      >
        {/* Card face */}
        <div
          className="relative overflow-hidden rounded-2xl p-4 sm:p-5 border border-white/10"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{ background: `radial-gradient(circle at center, ${award.glowColor}, transparent 70%)` }}
          />

          {/* Foil shine on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)',
            }}
          />

          {/* Card edge depth */}
          <div
            className="absolute -bottom-[2px] left-[2px] right-[2px] h-[4px] rounded-b-2xl"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(0,0,0,0.3))' }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 + index * 0.1 }}
              className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 ${award.iconColor}`}
              style={{ transform: 'translateZ(12px)' }}
            >
              {icon}
            </motion.div>

            <h3 className="text-white font-bold text-xs sm:text-sm mb-0.5" style={{ transform: 'translateZ(8px)' }}>
              {award.title}
            </h3>
            <p className="text-gray-400 text-[10px] sm:text-xs mb-1" style={{ transform: 'translateZ(6px)' }}>
              {award.subtitle}
            </p>
            <p className="text-gray-600 text-[10px]" style={{ transform: 'translateZ(4px)' }}>
              {award.company}
            </p>
          </div>
        </div>

        {/* Floating shadow */}
        <div
          className="absolute inset-x-2 -bottom-2 h-4 rounded-full -z-10 opacity-60 group-hover:opacity-80 transition-opacity"
          style={{ background: 'rgba(0,0,0,0.4)', filter: 'blur(8px)' }}
        />
      </motion.div>
    </motion.div>
  )
}

// ─── Data ────────────────────────────────────────────────────

function StatIcon({ type }: { type: string }) {
  switch (type) {
    case 'book':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
    case 'briefcase':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
    case 'code':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    case 'cert':
      return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
    default:
      return null
  }
}

const stats = [
  { value: 3.88, label: 'GPA', suffix: '', decimals: 2, icon: 'book' },
  { value: 3, label: 'Years Experience', suffix: '+', decimals: 0, icon: 'briefcase' },
  { value: 20, label: 'Projects Built', suffix: '+', decimals: 0, icon: 'code' },
  { value: 17, label: 'Certifications', suffix: '+', decimals: 0, icon: 'cert' },
]

const awards = [
  { title: 'Top Talent Award', subtitle: 'DevOps Excellence', company: 'Persistent Systems', glowColor: 'rgba(234, 179, 8, 0.15)', iconColor: 'text-yellow-400' },
  { title: 'Data Science GQP MVP', subtitle: 'Outstanding Project Contribution', company: 'WPI x Crossing', glowColor: 'rgba(0, 212, 255, 0.15)', iconColor: 'text-cyan-400' },
  { title: 'Bravo Individual Award', subtitle: 'Technology & Process Excellence', company: 'Persistent Systems', glowColor: 'rgba(168, 85, 247, 0.15)', iconColor: 'text-purple-400' },
  { title: 'Team Excellence Award', subtitle: 'Annual Awards FY2023', company: 'Persistent Systems', glowColor: 'rgba(16, 185, 129, 0.15)', iconColor: 'text-emerald-400' },
  { title: 'Bravo Team Award', subtitle: 'Teamwork & Dedication', company: 'Persistent Systems', glowColor: 'rgba(99, 102, 241, 0.15)', iconColor: 'text-indigo-400' },
  { title: 'Top Intern', subtitle: 'Out of 20,000+ New Joiners', company: 'Persistent Systems', glowColor: 'rgba(249, 115, 22, 0.15)', iconColor: 'text-orange-400' },
]

const awardIcons = [
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0012 0V2z"/></svg>,
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>,
]

const GDEV_PROFILE = 'https://g.dev/shreyaboyane'

// Badge data — all with real SVG artwork and gdev profile links
const badgePins = [
  {
    name: 'Deploy Faster GenAI with NVIDIA NIM on GKE',
    image: '/images/badges/deploy-genai-nvidia.svg',
    color: 'rgba(30,30,40,0.9)',
    borderColor: 'rgba(118,185,0,0.4)',
    shadowColor: 'rgba(118,185,0,0.15)',
    link: GDEV_PROFILE,
  },
  {
    name: 'Intro to Inference: AI Models on GPU',
    image: '/images/badges/intro-inference-gpu.svg',
    color: 'rgba(30,30,40,0.9)',
    borderColor: 'rgba(118,185,0,0.4)',
    shadowColor: 'rgba(118,185,0,0.15)',
    link: GDEV_PROFILE,
  },
  {
    name: 'Speed Up Data Analytics with GPUs',
    image: '/images/badges/speed-up-data-analytics.svg',
    color: 'rgba(30,30,40,0.9)',
    borderColor: 'rgba(118,185,0,0.4)',
    shadowColor: 'rgba(118,185,0,0.15)',
    link: GDEV_PROFILE,
  },
  {
    name: 'Gemini Enterprise Agent Ready',
    image: '/images/badges/gemini-enterprise-agent.svg',
    color: 'rgba(30,30,40,0.9)',
    borderColor: 'rgba(52,168,83,0.4)',
    shadowColor: 'rgba(52,168,83,0.15)',
    link: GDEV_PROFILE,
  },
  {
    name: 'Google Cloud & NVIDIA Community',
    image: '/images/badges/nvidia-community.svg',
    color: 'rgba(30,30,40,0.9)',
    borderColor: 'rgba(118,185,0,0.4)',
    shadowColor: 'rgba(118,185,0,0.15)',
    link: GDEV_PROFILE,
  },
  {
    name: 'Python Gold Badge — HackerRank',
    image: '/images/badges/python-gold-hackerrank.svg',
    color: 'transparent',
    borderColor: 'transparent',
    shadowColor: 'rgba(212,160,23,0.15)',
    noPinStyle: true,
    link: 'https://www.hackerrank.com/profile/shreyaa_boyane',
  },
  {
    name: 'Google Developer Profile',
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    color: 'rgba(30,35,45,0.9)',
    borderColor: 'rgba(66,133,244,0.35)',
    shadowColor: 'rgba(66,133,244,0.12)',
    link: GDEV_PROFILE,
  },
]

// ─── Main Component ──────────────────────────────────────────

export default function AchievementsSection() {
  return (
    <div className="py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Awards, certifications, and academic highlights.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="floating-card p-4 sm:p-6 text-center"
            >
              <div className="text-primary mb-2 flex justify-center">
                <StatIcon type={stat.icon} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold gradient-text">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Awards — 3D Certificate Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-yellow-400">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            Awards
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {awards.map((award, index) => (
              <CertificateCard3D key={index} award={award} icon={awardIcons[index]} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Certifications & Badges — 3D Enamel Pins */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Certifications &amp; Badges
          </h3>

          {/* Pin board — grid of 3D enamel pins */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-6">
            {badgePins.map((badge, i) => (
              <EnamelPinBadge key={i} badge={badge} index={i} />
            ))}
          </div>

          {/* Profile links */}
          <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-white/10">
            <a href="https://g.dev/shreyaboyane" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google Developer
            </a>
            <a href="https://dev.to/sonicab" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .67-.08.84-.23.18-.16.27-.45.27-.95v-2c0-.5-.09-.78-.27-.95zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.29 2.72 0 2.24-.04 2.37-.44 3.15zm4.65-6.47h-1.97v2.86h1.97v1.2H11.2v2.86h2v1.2H9.78V8.53h3.43v1.3zm4.14 6.88c-.3.63-.74 1.01-1.3 1.05-.53.04-.96-.16-1.23-.62-.32-.55-.36-.9-.36-4.41 0-2.68.05-3.39.25-3.86.32-.71 1-.92 1.57-.67.42.19.63.49.8 1.15l.13.71-.75.1c-.18-1.2-.37-1.5-.79-1.5-.49 0-.65.5-.65 3.07 0 2.72.16 3.2.69 3.2.38 0 .56-.3.72-1.18l.76.08c-.08.64-.16 1.05-.3 1.3-.15.27-.26.42-.54.58z"/>
              </svg>
              Dev.to
            </a>
          </div>
        </motion.div>

        {/* Research */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="floating-card p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            Research
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ongoing</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Algoverse</h4>
              <p className="text-gray-400 text-xs">Physical AI domain</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Ongoing</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Independent Study — Prof. Roee Shraga</h4>
              <p className="text-gray-400 text-xs">Responsible AI &mdash; Worcester Polytechnic Institute</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Jan &ndash; Aug 2025</span>
              </div>
              <h4 className="text-sm font-semibold text-white">Graduate Student Researcher</h4>
              <p className="text-gray-400 text-xs">GenAI + Human-in-the-Loop triage assistant &mdash; WPI</p>
              <p className="text-gray-500 text-[10px] mt-1">Improved triage precision 20%, ESI accuracy 25%, reduced miscommunication 50%</p>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="floating-card p-4 sm:p-6"
        >
          <h3 className="text-base sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary flex-shrink-0">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Education
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border-l-2 border-cyan-500 pl-3 sm:pl-4">
              <p className="text-primary text-xs sm:text-sm">Aug 2024 - May 2026</p>
              <h4 className="text-base sm:text-lg font-semibold text-white">M.S. in Artificial Intelligence</h4>
              <p className="text-gray-400 text-sm">Worcester Polytechnic Institute</p>
              <p className="text-accent text-xs sm:text-sm mt-1">GPA: 3.88/4.0</p>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">Generative AI, Computer Vision, Deep Learning, LLMs, MLOps</p>
            </div>
            <div className="border-l-2 border-purple-500 pl-3 sm:pl-4">
              <p className="text-accent text-xs sm:text-sm">2017 - 2021</p>
              <h4 className="text-base sm:text-lg font-semibold text-white">B.E. (Hons.) in Information Technology</h4>
              <p className="text-gray-400 text-sm">PES Modern College of Engineering</p>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">Specialization in Artificial Intelligence &amp; Machine Learning</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
