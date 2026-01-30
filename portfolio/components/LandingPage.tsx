'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ActiveSection } from '@/app/page'

interface LandingPageProps {
  onNavigate: (section: ActiveSection) => void
}

const floatingCards = [
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'See what I build',
    icon: 'rocket',
    wittyText: 'From brain tumors to game engines',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    position: { top: '15%', left: '8%' },
    delay: 0.2,
  },
  {
    id: 'experience',
    title: 'Experience',
    subtitle: 'Where I\'ve worked',
    icon: 'briefcase',
    wittyText: '95% faster deployments, no big deal',
    gradient: 'from-purple-500/20 to-pink-500/20',
    position: { top: '20%', right: '10%' },
    delay: 0.3,
  },
  {
    id: 'skills',
    title: 'Tech Stack',
    subtitle: 'My toolkit',
    icon: 'bolt',
    wittyText: 'PyTorch by day, Terraform by night',
    gradient: 'from-emerald-500/20 to-cyan-500/20',
    position: { bottom: '25%', left: '5%' },
    delay: 0.4,
  },
  {
    id: 'about',
    title: 'About',
    subtitle: 'The human behind the code',
    icon: 'user',
    wittyText: 'GPA 3.88 and still debugging life',
    gradient: 'from-orange-500/20 to-red-500/20',
    position: { bottom: '20%', right: '8%' },
    delay: 0.5,
  },
]

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/Sonica-B', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/shreya-boyane', icon: 'linkedin' },
  { name: 'Email', url: 'mailto:shreyaa.boyane@gmail.com', icon: 'email' },
]

function CardIcon({ type }: { type: string }) {
  switch (type) {
    case 'rocket':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
          <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
        </svg>
      )
    case 'briefcase':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
      )
    case 'bolt':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      )
    case 'user':
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    default:
      return null
  }
}

function SocialIcon({ type }: { type: string }) {
  switch (type) {
    case 'github':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    case 'email':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    default:
      return null
  }
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative flex items-center justify-center px-4"
    >
      {/* Floating Navigation Cards */}
      {floatingCards.map((card) => (
        <motion.button
          key={card.id}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: card.delay, duration: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate(card.id as ActiveSection)}
          className="absolute floating-card p-5 cursor-pointer group hidden md:block"
          style={card.position as React.CSSProperties}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative z-10">
            <div className="mb-3">
              <CardIcon type={card.icon} />
            </div>
            <h3 className="text-white font-semibold text-lg">{card.title}</h3>
            <p className="text-gray-400 text-xs mt-1">{card.subtitle}</p>
            <p className="text-gray-500 text-[10px] mt-2 italic opacity-0 group-hover:opacity-100 transition-opacity max-w-[140px]">
              &quot;{card.wittyText}&quot;
            </p>
          </div>
        </motion.button>
      ))}

      {/* Main Content - Center */}
      <div className="text-center z-10 max-w-2xl">
        {/* Profile Picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="mb-8 flex justify-center"
        >
          <div className="profile-glow">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src="/shreya.jpg"
                alt="Shreya Boyane"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Name & Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-white">Hi, I&apos;m </span>
            <span className="gradient-text">Shreya</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 font-light mb-2"
          >
            AI/ML Engineer
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm md:text-base text-gray-500 mb-8 max-w-md mx-auto"
          >
            Building production-grade AI systems.
            <br />
            <span className="text-primary">Agentic AI</span> · <span className="text-accent">LLMs</span> · <span className="text-primary">Computer Vision</span>
          </motion.p>
        </motion.div>

        {/* Contact Info Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          <a href="mailto:shreyaa.boyane@gmail.com" className="glass-button text-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            shreyaa.boyane@gmail.com
          </a>
          <a href="tel:+17745199905" className="glass-button text-sm flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            (774) 519-9905
          </a>
          <span className="glass-button text-sm flex items-center gap-2 cursor-default">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Worcester, MA
          </span>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center gap-4 mb-10"
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-12 h-12 rounded-2xl liquid-glass flex items-center justify-center text-gray-400 hover:text-white social-icon"
            >
              <SocialIcon type={link.icon} />
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => onNavigate('projects')}
            className="glass-button glass-button-primary text-base"
          >
            View My Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline ml-2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            className="glass-button text-base"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Mobile Navigation Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="md:hidden mt-12 grid grid-cols-2 gap-3"
        >
          {floatingCards.map((card) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id as ActiveSection)}
              className="floating-card p-4 text-left"
            >
              <CardIcon type={card.icon} />
              <h3 className="text-white font-medium text-sm mt-2">{card.title}</h3>
              <p className="text-gray-500 text-xs">{card.subtitle}</p>
            </button>
          ))}
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-sm">Open to opportunities</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
