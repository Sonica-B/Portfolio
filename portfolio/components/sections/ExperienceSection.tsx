'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface TimelineItem {
  type: 'job' | 'education'
  title: string
  company: string
  location: string
  period: string
  highlights?: string[]
  tech?: string[]
  gradient: string
  coursework?: string
  gpa?: string
  current?: boolean
}

const timelineData: TimelineItem[] = [
  {
    type: 'education',
    title: 'B.E. (Hons.) in Information Technology',
    company: 'PES Modern College of Engineering',
    location: 'Pune, India',
    period: '2017 - 2021',
    coursework: 'Specialization in AI & Machine Learning',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    type: 'job',
    title: 'Web Developer Intern',
    company: 'Flavalon IT Solution LLP',
    location: 'Pune, India',
    period: 'Mar 2021 - May 2021',
    highlights: [
      'Developed and launched 5 interactive websites per quarter',
      'Integrated chatbot features increasing engagement 40%',
    ],
    tech: ['WordPress', 'CSS', 'JavaScript', 'MySQL'],
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    type: 'job',
    title: 'Software Engineer Intern',
    company: 'Persistent Systems',
    location: 'Pune, India',
    period: 'Jan 2022 - Jul 2022',
    highlights: [
      'Top Intern out of 20,000+ new joiners in India',
      'Engineered scalable ASP.NET Web APIs with .NET Core',
      'Optimized database queries achieving 30% faster load times',
      'Integrated Azure Machine Learning for predictive analytics',
    ],
    tech: ['.NET Core', 'SQL Server', 'Azure ML', 'Git'],
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    type: 'job',
    title: 'Lead DevOps Engineer',
    company: 'Persistent Systems',
    location: 'Pune, India',
    period: 'Jul 2022 - Jul 2024',
    highlights: [
      'Reduced deployment times 40% with robust CI/CD pipelines',
      'Optimized cloud infra on AWS & Azure cutting costs 30%',
      'Streamlined ML-Ops model deployment by 50% via automation',
      'Improved system uptime 25% with monitoring dashboards',
    ],
    tech: ['Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'AWS'],
    gradient: 'from-emerald-500 to-cyan-600',
  },
  {
    type: 'education',
    title: 'M.S. in Artificial Intelligence',
    company: 'Worcester Polytechnic Institute',
    location: 'Worcester, MA',
    period: 'Aug 2024 - May 2026',
    gpa: '3.88/4.0',
    coursework: 'Generative AI, Computer Vision, Deep Learning, LLMs, MLOps',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    type: 'job',
    title: 'Graduate Student Researcher',
    company: 'Worcester Polytechnic Institute',
    location: 'Worcester, MA',
    period: 'Jan 2025 - Aug 2025',
    highlights: [
      'Built GenAI + HITL triage assistant with difficulty-aware reasoning',
      'Improved triage precision 20%, ESI accuracy 25%',
      'Reduced miscommunication 50% and false escalations 40%',
    ],
    tech: ['PyTorch', 'OpenAI GPT', 'Scikit-Learn', 'FastAPI'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    type: 'job',
    title: 'Web Dev Lab Assistant - LSPE',
    company: 'Worcester Polytechnic Institute',
    location: 'Worcester, MA',
    period: 'Apr 2025 - Aug 2025',
    highlights: [
      'Built interactive data-driven web app for spaceflight trajectories',
      'Developed Python backend for the Lab of Spaceflight & Planetary Exploration',
    ],
    tech: ['Python', 'Data Visualization', 'Web Dev'],
    gradient: 'from-sky-500 to-blue-600',
  },
  {
    type: 'job',
    title: 'Machine Learning Engineer',
    company: 'Crossing (Industry-Sponsored GQP)',
    location: 'Massachusetts',
    period: 'Jul 2025 - Dec 2025',
    highlights: [
      'Built multi-agent document intelligence for H-1B workflows',
      'Achieved 95-99% structural accuracy, 99-100% missing-doc detection',
      'Automated processing in 10 min, saving 3-4 days per petition',
    ],
    tech: ['LangGraph', 'AWS Bedrock', 'Lambda', 'S3', 'Pydantic'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    type: 'job',
    title: 'Graduate Student Assistant',
    company: 'WPI - Hypersonic Vehicles Project',
    location: 'Worcester, MA',
    period: 'Jun 2025 - Present',
    current: true,
    highlights: [
      'Contributing to hypersonic vehicles research project',
    ],
    tech: ['Python', 'Research'],
    gradient: 'from-amber-500 to-orange-600',
  },
]

// Recruiter-friendly labels — role + domain focused
const sectionLabels = [
  'B.E. IT',
  'WEB DEV',
  'SDE INTERN',
  'DEVOPS LEAD',
  'M.S. AI',
  'AI RESEARCH',
  'SPACEFLIGHT',
  'ML ENGINEER',
  'CURRENT ROLE',
]

// Year markers extracted from timeline data
const yearMarkers = [
  '2017', // PES
  '2021', // Flavalon
  '2022', // Persistent intern
  '2022', // Persistent DevOps (same year, different half)
  '2024', // WPI
  '2025', // Research
  '2025', // LSPE
  '2025', // Crossing
  '2025', // Hypersonics
]

function TimelineRow({ item, label, index, activeIndex, year, showYear }: {
  item: TimelineItem
  label: string
  index: number
  activeIndex: number
  year: string
  showYear: boolean
}) {
  const distance = Math.abs(index - activeIndex)
  const opacity = distance === 0 ? 1 : distance === 1 ? 0.55 : 0.35
  const gap = distance === 0 ? 120 : distance === 1 ? 80 : 60

  return (
    <div className="relative">
      {/* Year marker on center line (desktop) */}
      {showYear && (
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -top-5 z-20 items-center justify-center">
          <span
            className="text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded-full border"
            style={{
              color: 'rgba(0,212,255,0.6)',
              borderColor: 'rgba(0,212,255,0.15)',
              background: 'rgba(0,10,20,0.8)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {year}
          </span>
        </div>
      )}
    <motion.div
      className="flex items-start lg:items-center justify-center"
      style={{
        gap,
        opacity,
        transition: 'opacity 0.5s ease, gap 0.5s ease',
      }}
    >
      {/* Left: Label */}
      <div className="hidden lg:block w-[280px] xl:w-[340px] text-right flex-shrink-0">
        <span
          className="text-lg xl:text-xl font-bold tracking-[0.15em] text-gray-500"
          style={{ fontFamily: 'inherit' }}
        >
          {label}
        </span>
      </div>

      {/* Right: Content Card */}
      <div className="w-full lg:w-[380px] xl:w-[440px] flex-shrink-0">
        <div className={`floating-card p-3 sm:p-4 group relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />

          <div className="relative z-10">
            {/* Mobile label */}
            <div className="lg:hidden mb-2">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-600">{label}</span>
            </div>

            {/* Type badge + period */}
            <div className="flex items-center gap-2 mb-1.5">
              {item.type === 'education' ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400 flex-shrink-0">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`flex-shrink-0 ${item.current ? 'text-amber-400' : 'text-cyan-400'}`}>
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
              )}
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                {item.period}
              </span>
              {item.current && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Current
                </span>
              )}
            </div>

            {/* Title & Company */}
            <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">{item.title}</h3>
            <p className="text-primary text-[10px] sm:text-xs">{item.company}</p>
            <p className="text-gray-500 text-[9px] sm:text-[10px] mb-1.5">{item.location}</p>

            {/* GPA */}
            {item.gpa && (
              <span className="inline-block text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-1.5">
                GPA: {item.gpa}
              </span>
            )}

            {/* Coursework */}
            {item.coursework && (
              <p className="text-gray-500 text-[9px] sm:text-[10px] mb-1.5">{item.coursework}</p>
            )}

            {/* Highlights */}
            {item.highlights && (
              <ul className="space-y-0.5 mb-1.5">
                {item.highlights.map((h, i) => (
                  <li key={i} className="text-gray-400 text-[9px] sm:text-[10px] flex items-start">
                    <span className="text-primary mr-1 mt-0.5 flex-shrink-0">
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 11 12 14 22 4"/>
                      </svg>
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            {/* Tech */}
            {item.tech && (
              <div className="flex flex-wrap gap-1">
                {item.tech.map((t, i) => (
                  <span key={i} className="text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-md border border-white/10 text-gray-500">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    </div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Progress line height
  const lineHeight = useSpring(
    useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']),
    { stiffness: 100, damping: 30 }
  )

  // Determine active row based on scroll position
  const updateActiveIndex = useCallback(() => {
    if (!rowsRef.current) return
    const rows = rowsRef.current.children
    const viewportCenter = window.innerHeight / 2

    let closest = 0
    let minDist = Infinity

    for (let i = 0; i < rows.length; i++) {
      const rect = (rows[i] as HTMLElement).getBoundingClientRect()
      const rowCenter = rect.top + rect.height / 2
      const dist = Math.abs(rowCenter - viewportCenter)
      if (dist < minDist) {
        minDist = dist
        closest = i
      }
    }
    setActiveIndex(closest)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', updateActiveIndex, { passive: true })
    updateActiveIndex()
    return () => window.removeEventListener('scroll', updateActiveIndex)
  }, [updateActiveIndex])

  return (
    <div ref={sectionRef} className="relative py-16 sm:py-20 lg:py-[120px] px-4 sm:px-6 md:px-8">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            3+ years across AI research, DevOps, and production ML systems.
          </p>
        </motion.div>

        {/* Two-column timeline */}
        <div className="relative">
          {/* Center vertical line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 h-full pointer-events-none">
            {/* Track */}
            <div className="w-[1px] h-full bg-white/[0.06]" />
            {/* Progress glow */}
            <motion.div
              className="absolute top-0 left-0 w-[1px]"
              style={{
                height: lineHeight,
                background: 'linear-gradient(to bottom, #06b6d4, #a855f7, #f59e0b)',
                boxShadow: '0 0 8px rgba(6,182,212,0.3)',
              }}
            />
          </div>

          {/* Timeline rows */}
          <div ref={rowsRef} className="flex flex-col gap-6 sm:gap-8 lg:gap-[50px]">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TimelineRow
                  item={item}
                  label={sectionLabels[index]}
                  index={index}
                  activeIndex={activeIndex}
                  year={yearMarkers[index]}
                  showYear={index === 0 || yearMarkers[index] !== yearMarkers[index - 1]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
