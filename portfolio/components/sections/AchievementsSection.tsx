'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

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

function StatIcon({ type }: { type: string }) {
  switch (type) {
    case 'book':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      )
    case 'briefcase':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
      )
    case 'code':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    case 'target':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    default:
      return null
  }
}

const stats = [
  { value: 3.88, label: 'GPA', suffix: '', decimals: 2, icon: 'book' },
  { value: 2, label: 'Years Experience', suffix: '+', decimals: 0, icon: 'briefcase' },
  { value: 20, label: 'Projects Built', suffix: '+', decimals: 0, icon: 'code' },
  { value: 95, label: 'Accuracy Achieved', suffix: '%', decimals: 0, icon: 'target' },
]

const awards = [
  {
    title: 'Top Talent 2024',
    company: 'Persistent Systems',
    description: 'Recognized among top performers across the organization',
    glowColor: 'rgba(234, 179, 8, 0.15)',
  },
  {
    title: 'Bravo Individual Award',
    company: 'Persistent Systems',
    description: 'Excellence in DevOps automation and team leadership',
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
  {
    title: '1st Rank - Yantra-Maan Robotics',
    company: 'Xtronica Mpulse 2018',
    description: 'First place in national robotics competition',
    glowColor: 'rgba(0, 212, 255, 0.15)',
  },
]

export default function AchievementsSection() {
  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
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
            Milestones, awards, and academic highlights.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
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

        {/* Awards */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {awards.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="floating-card p-5 sm:p-6 group relative overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${award.glowColor}, transparent 70%)` }}
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.3 + index * 0.15 }}
                  className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4"
                >
                  {index === 0 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-yellow-400">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
                      <circle cx="12" cy="8" r="6"/>
                      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                  )}
                </motion.div>

                <h3 className="text-white font-bold text-sm sm:text-base mb-1">{award.title}</h3>
                <p className="text-primary text-xs sm:text-sm mb-2">{award.company}</p>
                <p className="text-gray-500 text-xs">{award.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

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
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
                Generative AI, Computer Vision, Deep Learning, LLMs, MLOps
              </p>
            </div>
            <div className="border-l-2 border-purple-500 pl-3 sm:pl-4">
              <p className="text-accent text-xs sm:text-sm">Jun 2018 - May 2022</p>
              <h4 className="text-base sm:text-lg font-semibold text-white">B.E. in Information Technology</h4>
              <p className="text-gray-400 text-sm">PES Modern College of Engineering</p>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
                Honors in AI and Machine Learning
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
