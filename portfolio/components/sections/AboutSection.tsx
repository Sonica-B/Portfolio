'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
        </motion.div>

        {/* Bio Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="floating-card p-4 sm:p-6"
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

        {/* What Drives Me */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
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
    </div>
  )
}
