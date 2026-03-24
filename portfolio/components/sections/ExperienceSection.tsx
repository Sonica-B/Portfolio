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

// Extended winding S-curve road paths for 9 milestones
const DESKTOP_PATH = 'M400 50 C200 50 150 150 400 200 C650 250 200 320 400 380 C600 440 150 500 400 560 C650 620 200 680 400 740 C600 800 150 860 400 920 C650 980 200 1040 400 1100 C600 1160 150 1220 400 1280 C650 1340 200 1400 400 1460 C600 1520 200 1600 400 1660'
const MOBILE_PATH = 'M160 50 C80 50 60 180 160 230 C260 280 60 410 160 460 C260 510 60 640 160 690 C260 740 60 870 160 920 C260 970 60 1100 160 1150 C260 1200 60 1330 160 1380 C260 1430 60 1560 160 1610 C260 1660 60 1790 160 1840 C260 1890 60 2020 160 2070'

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const [milestonePositions, setMilestonePositions] = useState<{ x: number; y: number }[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])

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

    const timer = setTimeout(computePositions, 100)
    window.addEventListener('resize', computePositions)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', computePositions)
    }
  }, [isMobile])

  const svgWidth = isMobile ? 320 : 800
  const svgHeight = isMobile ? 2120 : 1710
  const currentPath = isMobile ? MOBILE_PATH : DESKTOP_PATH
  const roadWidth = isMobile ? 36 : 54

  return (
    <div ref={sectionRef} className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-8">
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
            3+ years across AI research, DevOps, and production ML systems.
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
            {/* Road surface */}
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

            {/* Center dashes */}
            <motion.path
              d={currentPath}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="2"
              strokeDasharray="12 18"
              strokeLinecap="round"
              style={{ pathLength }}
            />

            {/* Hidden path reference */}
            <path ref={pathRef} d={currentPath} fill="none" stroke="transparent" strokeWidth="0" />

            <defs>
              <linearGradient id="roadGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="33%" stopColor="#a855f7" />
                <stop offset="66%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>

            {/* Milestone dots */}
            {milestonePositions.map((pos, i) => (
              <motion.circle
                key={i}
                cx={pos.x}
                cy={pos.y}
                r={timelineData[i].type === 'education' ? 9 : 6}
                fill={timelineData[i].current ? '#f59e0b' : timelineData[i].type === 'education' ? '#a855f7' : '#06b6d4'}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, type: 'spring', stiffness: 200 }}
              />
            ))}
          </svg>

          {/* Cards */}
          <div className="relative" style={{ height: svgHeight }}>
            {milestonePositions.map((pos, index) => {
              const item = timelineData[index]
              const isLeft = !isMobile && index % 2 === 0
              const cardStyle: React.CSSProperties = isMobile
                ? {
                    position: 'absolute',
                    top: `${(pos.y / svgHeight) * 100}%`,
                    left: '50%',
                    transform: 'translate(-50%, 16px)',
                    width: '88%',
                    maxWidth: '340px',
                  }
                : {
                    position: 'absolute',
                    top: `${(pos.y / svgHeight) * 100}%`,
                    ...(isLeft
                      ? { right: '55%', transform: 'translateY(-50%)' }
                      : { left: '55%', transform: 'translateY(-50%)' }),
                    width: '38%',
                    maxWidth: '360px',
                  }

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isMobile ? 0 : isLeft ? -30 : 30, y: isMobile ? 20 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: isMobile ? 20 : 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  style={cardStyle}
                >
                  <div className="floating-card p-3 sm:p-4 group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />

                    <div className="relative z-10">
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
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
