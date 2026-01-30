'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const terminalLines = [
  { prompt: 'shreya@ai-dev:~$', command: 'cat about.txt', delay: 0 },
  { output: '', delay: 500 },
  { output: '> Machine Learning Engineer with 2+ years of DevOps experience', delay: 800 },
  { output: '> Specializing in Agentic AI workflows, LLMs, and GenAI', delay: 1100 },
  { output: '> M.S. in Artificial Intelligence @ WPI (GPA: 3.88)', delay: 1400 },
  { output: '', delay: 1700 },
  { prompt: 'shreya@ai-dev:~$', command: 'ls achievements/', delay: 2000 },
  { output: 'top-talent-2024.award  bravo-individual.award', delay: 2300 },
  { output: '', delay: 2500 },
  { prompt: 'shreya@ai-dev:~$', command: 'echo $CURRENT_FOCUS', delay: 2800 },
  { output: 'Building production-grade AI systems that drive efficiency', delay: 3100 },
]

export default function About() {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isInView])

  useEffect(() => {
    if (!isInView) return

    terminalLines.forEach((_, index) => {
      const line = terminalLines[index]
      setTimeout(() => {
        setVisibleLines(index + 1)
      }, line.delay)
    })
  }, [isInView])

  return (
    <section id="about" ref={sectionRef} className="flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">{'>'}</span> About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-surface rounded-lg border border-surface-light overflow-hidden"
        >
          {/* Terminal Header */}
          <div className="bg-surface-light px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-gray-500 text-sm">terminal — shreya@ai-dev</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6 font-mono text-sm md:text-base min-h-[400px]">
            {terminalLines.slice(0, visibleLines).map((line, index) => (
              <div key={index} className="mb-2">
                {line.prompt && (
                  <span>
                    <span className="text-green-400">{line.prompt}</span>
                    <span className="text-white ml-2">{line.command}</span>
                  </span>
                )}
                {line.output !== undefined && !line.prompt && (
                  <span className="text-gray-300">{line.output}</span>
                )}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className="text-primary cursor-blink">▊</span>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { value: '3.88', label: 'GPA' },
            { value: '2+', label: 'Years Exp' },
            { value: '20+', label: 'Projects' },
            { value: '95%', label: 'Accuracy' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-surface border border-surface-light rounded-lg p-4 text-center hover:border-primary transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
