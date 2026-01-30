'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'AI Engineer & ML Researcher'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative flex items-center justify-center min-h-screen">
      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-primary text-sm md:text-base mb-4 tracking-widest">
            {'// HELLO WORLD'}
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-white">I&apos;m </span>
            <span className="gradient-text">Shreya Boyane</span>
          </h1>

          <div className="h-8 md:h-10 mb-8">
            <p className="text-lg md:text-2xl text-gray-300 font-light">
              {displayText}
              <span className="cursor-blink text-primary">|</span>
            </p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-gray-400 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed"
          >
            Specializing in <span className="text-primary">Agentic AI workflows</span>,{' '}
            <span className="text-accent">LLMs</span>, and{' '}
            <span className="text-primary">Computer Vision</span>.
            Building production-grade AI systems that drive operational efficiency.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-3 bg-primary/10 border border-primary text-primary rounded-lg
                         hover:bg-primary/20 hover:shadow-glow-primary transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-3 bg-accent/10 border border-accent text-accent rounded-lg
                         hover:bg-accent/20 hover:shadow-glow-accent transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <a href="#about" className="flex flex-col items-center text-gray-500 hover:text-primary transition-colors">
            <span className="text-xs mb-2">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
