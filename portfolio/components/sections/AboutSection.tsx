'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <div className="relative min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" />
      <div className="max-w-4xl mx-auto relative z-10">
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
              <p className="text-gray-500 text-sm">Greater Boston, MA</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              I&apos;m a <span className="text-primary">Machine Learning Engineer</span> with 3+ years of DevOps experience,
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

          {/* Social & Developer Profiles */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-gray-500 text-xs mb-3 text-center sm:text-left">Find me on</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <a href="https://github.com/Sonica-B" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/shreya-boyane/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/30 transition-all text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>
              <a href="https://g.dev/shreyaboyane" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-blue-400 hover:border-blue-400/30 transition-all text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google Dev
              </a>
              <a href="https://dev.to/sonicab" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6v4.36h.58c.37 0 .67-.08.87-.25.21-.18.31-.5.31-.95v-1.97c0-.47-.12-.79-.34-.96zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.29 2.72 0 2.24-.04 2.37-.44 3.15zm4.38-1.98c0 1.07-.01 1.65-.03 1.72-.05.12-.22.29-.64.29-.42 0-.57-.17-.64-.29-.02-.07-.03-.65-.03-1.72V11.1c0-1.08.01-1.65.03-1.72.07-.12.22-.29.64-.29.42 0 .59.17.64.29.02.07.03.64.03 1.72v2.22zm4.95 2.07c-.55.3-1.13.22-1.5-.22-.27-.31-.36-.56-.36-1.83V11.1c0-1.27.1-1.52.37-1.83.38-.44.95-.52 1.49-.22.31.18.46.44.56.83.04.14.05.62.05 1.78v1.68c0 1.09-.02 1.65-.05 1.78-.1.39-.25.65-.56.83zM18.74 8.9c-.38-.44-.95-.52-1.49-.22-.31.18-.46.44-.56.83-.04.14-.05.62-.05 1.78v1.36c0 1.27.1 1.52.37 1.83.37.44.95.52 1.49.22.31-.18.46-.44.56-.83.04-.14.05-.62.05-1.78v-1.36c0-1.16-.02-1.64-.05-1.78-.1-.39-.25-.65-.56-.83-.16-.09-.33-.14-.5-.14-.17 0-.34.05-.5.14.16-.09.34-.14.5-.14.17 0 .34.05.5.14v-.02z"/></svg>
                Dev.to
              </a>
              <a href="https://orcid.org/0009-0004-1211-3253" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-green-400 hover:border-green-400/30 transition-all text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 01-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.05-2.381 4.05-3.713 0-1.528-.906-3.731-3.891-3.731h-2.456z"/></svg>
                ORCID
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
                sonica0218
              </span>
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
