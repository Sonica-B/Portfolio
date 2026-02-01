'use client'

import { motion } from 'framer-motion'
import { ActiveSection } from '@/app/page'
import { useEffect, useState } from 'react'

interface BubbleData {
  id: ActiveSection
  title: string
  subtitle: string
  size: string
  top: string
  right: string
  delay: number
  morphDuration: number
}

const bubbles: BubbleData[] = [
  { id: 'projects', title: 'Projects', subtitle: 'My experiments', size: '140px', top: '5%', right: '5%', delay: 0, morphDuration: 8 },
  { id: 'experience', title: 'Experience', subtitle: 'My journey so far', size: '155px', top: '8%', right: '30%', delay: 0.2, morphDuration: 10 },
  { id: 'skills', title: 'Skills', subtitle: 'My powers', size: '130px', top: '40%', right: '2%', delay: 0.4, morphDuration: 7 },
  { id: 'about', title: 'About Me', subtitle: 'My story', size: '135px', top: '55%', right: '25%', delay: 0.6, morphDuration: 9 },
]

// Generate random blob border-radius values
function generateBlobRadius(): string {
  const values = Array.from({ length: 8 }, () =>
    Math.floor(Math.random() * 30 + 35) + '%'
  )
  return `${values[0]} ${values[1]} ${values[2]} ${values[3]} / ${values[4]} ${values[5]} ${values[6]} ${values[7]}`
}

function LiquidBubble({
  bubble,
  onNavigate
}: {
  bubble: BubbleData
  onNavigate: (section: ActiveSection) => void
}) {
  const [borderRadius, setBorderRadius] = useState(generateBlobRadius())

  // Continuously morph the bubble shape
  useEffect(() => {
    const interval = setInterval(() => {
      setBorderRadius(generateBlobRadius())
    }, bubble.morphDuration * 1000 / 3) // Change shape 3 times per cycle

    return () => clearInterval(interval)
  }, [bubble.morphDuration])

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: bubble.delay,
        duration: 0.8,
        type: 'spring',
        stiffness: 100
      }}
      onClick={() => onNavigate(bubble.id)}
      className="absolute cursor-pointer group"
      style={{
        top: bubble.top,
        right: bubble.right,
        width: bubble.size,
        height: bubble.size,
      }}
    >
      {/* Floating animation wrapper */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 8, -3, 0],
          rotate: [0, 3, -2, 0],
        }}
        transition={{
          duration: bubble.morphDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full h-full"
      >
        {/* Main bubble - Dynamic morphing shape (60% visible) */}
        <div
          className="absolute inset-0 transition-all group-hover:scale-105"
          style={{
            borderRadius: borderRadius,
            transitionDuration: `${bubble.morphDuration / 3}s`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            background: `
              radial-gradient(circle at 30% 30%,
                rgba(255,255,255,0.08) 0%,
                transparent 50%
              ),
              radial-gradient(circle at 70% 80%,
                rgba(168,85,247,0.12) 0%,
                transparent 40%
              ),
              radial-gradient(circle at 20% 70%,
                rgba(0,212,255,0.08) 0%,
                transparent 40%
              )
            `,
            border: '1px solid rgba(168,85,247,0.25)',
            boxShadow: `
              inset 0 0 40px rgba(168,85,247,0.08),
              inset 0 0 15px rgba(0,212,255,0.06),
              0 0 25px rgba(168,85,247,0.1)
            `,
            backdropFilter: 'blur(2px)',
            opacity: 0.7,
          }}
        />

        {/* Iridescent rim - top (also morphs) */}
        <div
          className="absolute pointer-events-none transition-all"
          style={{
            top: '5%',
            left: '10%',
            right: '10%',
            height: '40%',
            background: 'linear-gradient(180deg, rgba(0,212,255,0.15) 0%, rgba(168,85,247,0.1) 50%, transparent 100%)',
            borderRadius: borderRadius,
            transitionDuration: `${bubble.morphDuration / 3}s`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'blur(3px)',
            opacity: 0.7,
          }}
        />

        {/* Iridescent rim - bottom (also morphs) */}
        <div
          className="absolute pointer-events-none transition-all"
          style={{
            bottom: '5%',
            left: '15%',
            right: '15%',
            height: '35%',
            background: 'linear-gradient(0deg, rgba(168,85,247,0.18) 0%, rgba(236,72,153,0.1) 50%, transparent 100%)',
            borderRadius: borderRadius,
            transitionDuration: `${bubble.morphDuration / 3}s`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            filter: 'blur(4px)',
            opacity: 0.7,
          }}
        />

        {/* Small highlight - moves with morph */}
        <motion.div
          animate={{
            x: [0, 5, -3, 0],
            y: [0, -3, 2, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: bubble.morphDuration / 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute pointer-events-none"
          style={{
            top: '15%',
            left: '20%',
            width: '18%',
            height: '12%',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            filter: 'blur(4px)',
            opacity: 0.7,
          }}
        />

        {/* Label - Title & Subtitle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white/80 text-xs font-semibold tracking-wide drop-shadow-lg">
            {bubble.title}
          </span>
          <span className="text-white/50 text-[9px] font-light italic tracking-wider drop-shadow-lg">
            {bubble.subtitle}
          </span>
        </div>

        {/* Hover glow effect (also morphs) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            borderRadius: borderRadius,
            boxShadow: '0 0 30px rgba(0,212,255,0.15), inset 0 0 20px rgba(168,85,247,0.1)',
          }}
        />
      </motion.div>
    </motion.button>
  )
}

export default function SoapBubbles3D({
  onNavigate,
}: {
  onNavigate: (section: ActiveSection) => void
}) {
  return (
    <div className="absolute right-0 top-0 w-[45%] h-full z-30 pointer-events-none">
      {bubbles.map((bubble) => (
        <div key={bubble.id} className="pointer-events-auto">
          <LiquidBubble bubble={bubble} onNavigate={onNavigate} />
        </div>
      ))}
    </div>
  )
}
