'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface AboutSectionProps {
  onBack: () => void
}

const stats = [
  { value: '3.88', label: 'GPA', icon: 'book' },
  { value: '2+', label: 'Years Exp', icon: 'briefcase' },
  { value: '20+', label: 'Projects', icon: 'code' },
  { value: '95%', label: 'Accuracy', icon: 'target' },
]

const awards = [
  { title: 'Top Talent 2024', company: 'Persistent Systems' },
  { title: 'Bravo Individual Award', company: 'Persistent Systems' },
]

function StatIcon({ type }: { type: string }) {
  switch (type) {
    case 'book':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      )
    case 'briefcase':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
      )
    case 'code':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    case 'target':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      )
    default:
      return null
  }
}

export default function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <button
            onClick={onBack}
            className="glass-button text-sm mb-4 sm:mb-6 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 floating-card p-4 sm:p-6"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0">
                <Image
                  src="/shreya.jpg"
                  alt="Shreya Boyane"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Shreya Boyane</h2>
                <p className="text-primary">AI/ML Engineer</p>
                <p className="text-gray-500 text-sm">Worcester, MA</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I&apos;m a <span className="text-primary">Machine Learning Engineer</span> with 2+ years of DevOps experience,
                currently pursuing my M.S. in Artificial Intelligence at <span className="text-accent">Worcester Polytechnic Institute</span>.
              </p>
              <p>
                I specialize in building <span className="text-primary">production-grade Agentic AI workflows</span>,
                adaptive LLM systems, and Generative AI solutions. My work spans from multi-agent document intelligence
                systems to real-time computer vision applications.
              </p>
              <p>
                When I&apos;m not training models or debugging pipelines, you&apos;ll find me exploring the latest in AI research
                and figuring out how to make machines a little smarter and a lot more useful.
              </p>
            </div>

            {/* Quick Contact */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                <div className="text-center sm:text-left">
                  <p className="text-gray-500">Email</p>
                  <a href="mailto:shreyaa.boyane@gmail.com" className="text-primary hover:underline break-all">
                    shreyaa.boyane@gmail.com
                  </a>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-gray-500">Schedule a Call</p>
                  <a href="https://zcal.co/i/4aMYgoRr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Book a 30-min meeting
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="floating-card p-4 sm:p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <span className="text-primary">
                    <StatIcon type={stat.icon} />
                  </span>
                  <div>
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-gray-500 text-xs">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="floating-card p-4 sm:p-6 mt-4 sm:mt-6"
        >
          <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-yellow-400 flex-shrink-0">
              <circle cx="12" cy="8" r="6"/>
              <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
            </svg>
            Awards & Recognition
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/5">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-yellow-400 flex-shrink-0">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <div>
                  <p className="text-white font-medium text-sm sm:text-base">{award.title}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{award.company}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What Drives Me */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="floating-card p-4 sm:p-6 mt-4 sm:mt-6"
        >
          <h3 className="text-base sm:text-lg font-bold text-white mb-4 flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary flex-shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            What Drives Me
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-sm text-gray-400">
            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400 mb-2 sm:mb-3">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <span className="text-xs sm:text-sm">Turning research papers into production systems</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400 mb-2 sm:mb-3">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
              </svg>
              <span className="text-xs sm:text-sm">Making AI that actually helps people</span>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-white/5 border border-white/5 sm:col-span-2 md:col-span-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400 mb-2 sm:mb-3">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
              <span className="text-xs sm:text-sm">Optimizing everything, from code to coffee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
