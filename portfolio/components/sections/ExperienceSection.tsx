'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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
}

const timelineData: TimelineItem[] = [
  {
    type: 'education',
    title: 'B.E. in Information Technology',
    company: 'PES Modern College of Engineering',
    location: 'Pune, India',
    period: 'Jun 2018 - May 2022',
    coursework: 'Honors in AI and Machine Learning',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    type: 'job',
    title: 'Lead DevOps Engineer',
    company: 'Persistent Systems',
    location: 'Pune, India',
    period: 'Jun 2022 - Jul 2024',
    highlights: [
      'Achieved 95% faster deployments with CI/CD pipelines',
      'Reduced manual configuration 70% across 20+ projects',
      'Improved system uptime 25% with monitoring dashboards',
      'Received Top Talent 2024 & Bravo Individual Awards',
    ],
    tech: ['Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'Grafana'],
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
    title: 'ML Research Assistant',
    company: 'Worcester Polytechnic Institute',
    location: 'Worcester, MA',
    period: 'Jan 2025 - Aug 2025',
    highlights: [
      'Built confidence-aware triage orchestration raising precision 20%',
      'Engineered dual-channel AI workflows reducing miscommunication 50%',
      'Enhanced early critical case detection by 60%',
    ],
    tech: ['PyTorch', 'Scikit-Learn', 'LLMs', 'GPT-T Metrics'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    type: 'job',
    title: 'Machine Learning Engineer',
    company: 'Crossing x WPI (Industry GQP)',
    location: 'Worcester, MA',
    period: 'Aug 2025 - Dec 2025',
    highlights: [
      'Led sponsor-facing delivery with company engineers',
      'Built multi-agent document intelligence for H-1B workflows',
      'Achieved 95-99% structural accuracy on covered fields',
    ],
    tech: ['LangGraph', 'AWS Bedrock', 'Lambda', 'S3', 'Pydantic'],
    gradient: 'from-cyan-500 to-blue-600',
  },
]

// Winding S-curve road path for desktop and mobile
const DESKTOP_PATH = 'M400 50 C200 50 150 180 400 220 C650 260 200 340 400 400 C600 460 150 520 400 580 C650 640 200 720 400 780 C600 840 200 920 400 980'
const MOBILE_PATH = 'M160 50 C80 50 60 150 160 190 C260 230 60 310 160 360 C260 410 60 490 160 540 C260 590 60 670 160 720 C260 770 60 850 160 900'

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [milestonePositions, setMilestonePositions] = useState<{ x: number; y: number }[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0.1, 0.9], [0, 1])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Compute milestone positions along the SVG path
  useEffect(() => {
    const computePositions = () => {
      const pathEl = pathRef.current
      if (!pathEl) return

      const totalLength = pathEl.getTotalLength()
      const positions = timelineData.map((_, i) => {
        const t = (i + 0.5) / timelineData.length
        const point = pathEl.getPointAtLength(t * totalLength)
        return { x: point.x, y: point.y }
      })
      setMilestonePositions(positions)
    }

    // Wait for layout
    const timer = setTimeout(computePositions, 100)
    window.addEventListener('resize', computePositions)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', computePositions)
    }
  }, [isMobile])

  const svgWidth = isMobile ? 320 : 800
  const svgHeight = isMobile ? 950 : 1030
  const currentPath = isMobile ? MOBILE_PATH : DESKTOP_PATH
  const roadWidth = isMobile ? 40 : 60

  return (
    <div ref={sectionRef} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8">
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
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            2+ years building production AI systems and DevOps infrastructure.
          </p>
        </motion.div>

        {/* Road Timeline */}
        <div className="relative" style={{ minHeight: svgHeight }}>
          {/* SVG Road */}
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Road surface (dark) */}
            <path
              d={currentPath}
              fill="none"
              stroke="rgba(30,30,40,0.8)"
              strokeWidth={roadWidth}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Road edge glow */}
            <motion.path
              d={currentPath}
              fill="none"
              stroke="url(#roadGlow)"
              strokeWidth={roadWidth + 4}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
              opacity={0.3}
            />

            {/* Center dashes (drawn on scroll) */}
            <motion.path
              d={currentPath}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              strokeDasharray="12 18"
              strokeLinecap="round"
              style={{ pathLength }}
            />

            {/* Road path reference (hidden, used for getPointAtLength) */}
            <path
              ref={pathRef}
              d={currentPath}
              fill="none"
              stroke="transparent"
              strokeWidth="0"
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="roadGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Milestone dots on road */}
            {milestonePositions.map((pos, i) => (
              <motion.circle
                key={i}
                cx={pos.x}
                cy={pos.y}
                r={timelineData[i].type === 'education' ? 10 : 7}
                fill={timelineData[i].type === 'education' ? '#a855f7' : '#06b6d4'}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, type: 'spring', stiffness: 200 }}
              />
            ))}
          </svg>

          {/* Experience/Education Cards positioned relative to milestones */}
          <div className="relative" style={{ height: svgHeight }}>
            {milestonePositions.map((pos, index) => {
              const item = timelineData[index]
              // Desktop: alternate left/right of road. Mobile: centered below dot
              const isLeft = !isMobile && index % 2 === 0
              const cardStyle: React.CSSProperties = isMobile
                ? {
                    position: 'absolute',
                    top: `${(pos.y / svgHeight) * 100}%`,
                    left: '50%',
                    transform: 'translate(-50%, 10px)',
                    width: '85%',
                    maxWidth: '340px',
                  }
                : {
                    position: 'absolute',
                    top: `${(pos.y / svgHeight) * 100}%`,
                    ...(isLeft
                      ? { right: '55%', transform: 'translateY(-50%)' }
                      : { left: '55%', transform: 'translateY(-50%)' }),
                    width: '40%',
                    maxWidth: '380px',
                  }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isMobile ? 0 : isLeft ? -30 : 30, y: isMobile ? 20 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: isMobile ? 20 : 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={cardStyle}
                >
                  <div className="floating-card p-3 sm:p-5 group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />

                    <div className="relative z-10">
                      {/* Type badge */}
                      <div className="flex items-center gap-2 mb-2">
                        {item.type === 'education' ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                            <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                          </svg>
                        )}
                        <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/10">
                          {item.period}
                        </span>
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-sm sm:text-base font-bold text-white">{item.title}</h3>
                      <p className="text-primary text-xs sm:text-sm">{item.company}</p>
                      <p className="text-gray-500 text-[10px] sm:text-xs mb-2">{item.location}</p>

                      {/* GPA badge for education */}
                      {item.gpa && (
                        <span className="inline-block text-[10px] sm:text-xs px-2 py-0.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
                          GPA: {item.gpa}
                        </span>
                      )}

                      {/* Coursework for education */}
                      {item.coursework && (
                        <p className="text-gray-500 text-[10px] sm:text-xs mb-2">{item.coursework}</p>
                      )}

                      {/* Highlights for jobs */}
                      {item.highlights && (
                        <ul className="space-y-1 mb-2">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="text-gray-400 text-[10px] sm:text-xs flex items-start">
                              <span className="text-primary mr-1.5 mt-0.5 flex-shrink-0">
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <polyline points="9 11 12 14 22 4"/>
                                </svg>
                              </span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Tech Stack */}
                      {item.tech && (
                        <div className="flex flex-wrap gap-1">
                          {item.tech.map((t, i) => (
                            <span key={i} className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md border border-white/10 text-gray-500">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
