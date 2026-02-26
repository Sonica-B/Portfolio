'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const skillCategories = [
  {
    id: 'ai', title: 'AI & Machine Learning', short: 'AI & ML',
    color: '#06b6d4', gradient: ['#00d4ff', '#0891b2'],
    skills: ['PyTorch','TensorFlow','Scikit-Learn','Keras','Hugging Face','PyTorch Lightning','LLMs','LangGraph','LangChain','RAG','Deep Learning','Reinforcement Learning','NLP','Multi-agent Systems','OpenAI GPT','Prompt Engineering','OpenAI Evals','bi-LSTM','MLflow','Algorithms'],
  },
  {
    id: 'cv', title: 'Computer Vision & 3D', short: 'CV & 3D',
    color: '#a855f7', gradient: ['#c084fc', '#7c3aed'],
    skills: ['OpenCV','Computer Vision','Image Processing','Generative AI','NeRF','CycleGANs','Diffusion Models','Structure-from-Motion','Pose Estimation','Depth Estimation','Multi-modal Models','Signal Processing','Autoregressive Models'],
  },
  {
    id: 'cloud', title: 'Cloud & DevOps', short: 'Cloud/DevOps',
    color: '#ec4899', gradient: ['#f472b6', '#be185d'],
    skills: ['Azure DevOps','AWS (S3, Lambda, Bedrock)','Docker','Terraform','Kubernetes','CI/CD','Infrastructure-as-Code','Azure ML','Prometheus','Grafana','Linux','GitHub Actions','GitLab CI/CD','Ansible','SNYK Security','HPC (Slurm)','SRE','JIRA'],
  },
  {
    id: 'lang', title: 'Programming', short: 'Programming',
    color: '#10b981', gradient: ['#34d399', '#059669'],
    skills: ['Python','C','C++','C#','Java','R','Rust','Scala','SQL','MATLAB','HTML/CSS','JavaScript','Bash','PowerShell'],
  },
  {
    id: 'frameworks', title: 'Frameworks & Tools', short: 'Frameworks',
    color: '#f97316', gradient: ['#fb923c', '#c2410c'],
    skills: ['Flask','FastAPI','Angular','React','Unity Engine','Blender','ROS2','ONNX','TensorRT','CUDA','TorchScript','SIMD','Figma','Git','Tableau','Simulation'],
  },
  {
    id: 'data', title: 'Data & Databases', short: 'Data & DBs',
    color: '#3b82f6', gradient: ['#60a5fa', '#1d4ed8'],
    skills: ['MySQL','MongoDB','PostgreSQL','Firebase','DynamoDB','JSON Schemas','Data Analytics','Predictive Modeling','Statistical Modeling','Data Mining'],
  },
]

const totalSkills = skillCategories.reduce((s, c) => s + c.skills.length, 0)

const VIEW = 800
const CX = 400, CY = 400
const R = 150, SW = 72, GAP = 4
const R_OUT = R + SW / 2
const R_IN = R - SW / 2

function p2c(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arc(cx: number, cy: number, r: number, a1: number, a2: number) {
  const s = p2c(cx, cy, r, a2), e = p2c(cx, cy, r, a1)
  return `M ${s.x} ${s.y} A ${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 0 ${e.x} ${e.y}`
}

function Segment3D({
  startAngle, endAngle, catIndex, color, gradId,
  isActive, isHovered, isAnyActive,
  onActivate, onHover, onLeave,
}: {
  startAngle: number; endAngle: number; catIndex: number
  color: string; gradId: string
  isActive: boolean; isHovered: boolean; isAnyActive: boolean
  onActivate: () => void; onHover: () => void; onLeave: () => void
}) {
  const d = arc(CX, CY, R, startAngle, endAngle)
  const mid = (startAngle + endAngle) / 2
  const rad = ((mid - 90) * Math.PI) / 180
  const lit = isActive || isHovered
  const pop = lit ? 12 : 0
  const ox = Math.cos(rad) * pop, oy = Math.sin(rad) * pop
  const dim = isAnyActive && !lit ? 0.22 : 1
  const sp = { type: 'spring' as const, stiffness: 300, damping: 25 }

  return (
    <g style={{ cursor: 'pointer' }} onClick={onActivate} onMouseEnter={onHover} onMouseLeave={onLeave}>
      <motion.path d={d} fill="none" stroke={color} strokeWidth={SW + 22} strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: lit ? 0.4 : 0.05, x: ox, y: oy }}
        transition={{ pathLength: { duration: 1.2, delay: 0.1 + catIndex * 0.15, ease: 'easeInOut' }, opacity: { duration: 0.35 }, x: sp, y: sp }}
        style={{ filter: 'blur(12px)' }} />
      <motion.path d={d} fill="none" stroke={`url(#${gradId})`} strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, strokeWidth: lit ? SW + 8 : SW, opacity: dim, x: ox, y: oy }}
        transition={{ pathLength: { duration: 1.2, delay: 0.1 + catIndex * 0.15, ease: 'easeInOut' }, strokeWidth: sp, opacity: { duration: 0.35 }, x: sp, y: sp }} />
      <motion.path d={arc(CX, CY, R_IN + 8, startAngle + 1.5, endAngle - 1.5)} fill="none" stroke="white" strokeWidth={4} strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, opacity: lit ? 0.22 : 0.06, x: ox, y: oy }}
        transition={{ pathLength: { duration: 1.2, delay: 0.15 + catIndex * 0.15 }, opacity: { duration: 0.3 }, x: sp, y: sp }} />
      <motion.path d={arc(CX, CY, R_OUT + 6, startAngle + 1, endAngle - 1)} fill="none" stroke="black" strokeWidth={5} strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, opacity: lit ? 0.25 : 0.08, x: ox, y: oy }}
        transition={{ pathLength: { duration: 1.2, delay: 0.15 + catIndex * 0.15 }, opacity: { duration: 0.3 }, x: sp, y: sp }} />
      <motion.path d={d} fill="none" stroke="transparent" strokeWidth={SW + 30} strokeLinecap="round"
        animate={{ x: ox, y: oy }} transition={{ x: sp, y: sp }} />
    </g>
  )
}

function MobileSkillsPanel({ category }: { category: typeof skillCategories[number] }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      className="rounded-2xl border border-white/[0.08] p-4"
      style={{ background: 'rgba(10,10,20,0.85)', backdropFilter: 'blur(20px)' }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full" style={{ background: category.color }} />
        <h3 className="text-sm font-bold text-white">{category.title}</h3>
        <span className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md"
          style={{ color: category.color, background: `${category.color}12`, border: `1px solid ${category.color}20` }}>{category.skills.length}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill, i) => (
          <motion.span key={skill} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22, delay: i * 0.02 }}
            className="px-2 py-1 rounded-lg text-[11px] text-gray-300 border cursor-default"
            style={{ borderColor: `${category.color}18`, background: `${category.color}08` }}>{skill}</motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth < 768)
    c(); window.addEventListener('resize', c)
    return () => window.removeEventListener('resize', c)
  }, [])

  const arcs = useMemo(() => {
    const avail = 360 - GAP * skillCategories.length
    let cur = 0
    return skillCategories.map(cat => {
      const sweep = (cat.skills.length / totalSkills) * avail
      const s = cur + GAP / 2, e = s + sweep
      cur = e + GAP / 2
      return { start: s, end: e }
    })
  }, [])

  const toggle = useCallback((i: number) => setActiveIndex(p => p === i ? null : i), [])
  const di = hoveredIndex ?? activeIndex
  const dc = di !== null ? skillCategories[di] : null

  const connectors = useMemo(() => arcs.map((a, i) => {
    const mid = (a.start + a.end) / 2
    const rad = ((mid - 90) * Math.PI) / 180
    const cos = Math.cos(rad), sin = Math.sin(rad)
    const dotX = CX + (R_OUT + 4) * cos, dotY = CY + (R_OUT + 4) * sin
    const elbX = CX + (R_OUT + 40) * cos, elbY = CY + (R_OUT + 40) * sin
    const isRight = cos >= 0
    return { dotX, dotY, elbX, elbY, endX: elbX + (isRight ? 50 : -50), endY: elbY, isRight }
  }), [arcs])

  return (
    <section className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8 relative">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" />
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"><span className="gradient-text">Tech Stack</span></h2>
          <p className="text-gray-400 text-base sm:text-lg">{totalSkills} technologies across {skillCategories.length} domains</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex justify-center mb-6">
          <div className="relative w-full" style={{ maxWidth: isMobile ? 280 : 700, overflow: 'visible' }}>
            {!isMobile && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ overflow: 'visible' }}>
                <div className="rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)', filter: 'blur(40px)' }} />
              </div>
            )}

            <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="w-full" style={{ display: 'block', overflow: 'visible' }}>
              <defs>
                {skillCategories.map(cat => (
                  <linearGradient key={cat.id} id={`sg-${cat.id}`} gradientUnits="userSpaceOnUse" x1={CX - R} y1={CY - R} x2={CX + R} y2={CY + R}>
                    <stop offset="0%" stopColor={cat.gradient[0]} /><stop offset="100%" stopColor={cat.gradient[1]} />
                  </linearGradient>
                ))}
                <radialGradient id="cg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(168,85,247,0.08)" /><stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx={CX} cy={CY} r={R_IN - 10} fill="url(#cg)" />
              <circle cx={CX} cy={CY} r={R_IN - 4} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
              <circle cx={CX} cy={CY} r={R_OUT + 4} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
              <circle cx={CX} cy={CY} r={R_OUT + 16} fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth={0.5} strokeDasharray="4 8" />

              {skillCategories.map((cat, i) => (
                <Segment3D key={cat.id} startAngle={arcs[i].start} endAngle={arcs[i].end}
                  catIndex={i} color={cat.color} gradId={`sg-${cat.id}`}
                  isActive={activeIndex === i} isHovered={hoveredIndex === i} isAnyActive={activeIndex !== null}
                  onActivate={() => toggle(i)} onHover={() => setHoveredIndex(i)} onLeave={() => setHoveredIndex(null)} />
              ))}

              {!isMobile && connectors.map((c, i) => {
                const cat = skillCategories[i], lit = di === i
                return (
                  <g key={`c-${cat.id}`}>
                    <motion.circle cx={c.dotX} cy={c.dotY} r={4} fill={lit ? cat.color : 'rgba(255,255,255,0.5)'}
                      animate={{ opacity: lit ? 1 : 0.35, r: lit ? 5 : 3.5 }} transition={{ duration: 0.3 }} />
                    <motion.path d={`M ${c.dotX} ${c.dotY} L ${c.elbX} ${c.elbY} L ${c.endX} ${c.endY}`}
                      fill="none" strokeLinecap="round"
                      animate={{ stroke: lit ? cat.color : 'rgba(255,255,255,0.12)', strokeWidth: lit ? 1.5 : 0.8, opacity: lit ? 0.9 : 0.4 }}
                      transition={{ duration: 0.3 }} />
                    <motion.circle cx={c.endX} cy={c.endY} r={2} fill={lit ? cat.color : 'rgba(255,255,255,0.2)'}
                      animate={{ opacity: lit ? 0.8 : 0.2 }} transition={{ duration: 0.3 }} />
                  </g>
                )
              })}
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                {dc ? (
                  <motion.div key={dc.id} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }} className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl font-bold" style={{ color: dc.color }}>{dc.skills.length}</span>
                    <span className="text-[10px] sm:text-xs text-gray-400 mt-0.5 text-center leading-tight max-w-[110px]">{dc.title}</span>
                  </motion.div>
                ) : (
                  <motion.div key="total" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }} className="flex flex-col items-center">
                    <span className="text-4xl sm:text-5xl font-bold text-white">{totalSkills}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 mt-1 uppercase tracking-widest">Skills</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!isMobile && connectors.map((c, i) => {
              const cat = skillCategories[i], lit = di === i
              const pct = ((cat.skills.length / totalSkills) * 100).toFixed(1)
              return (
                <div key={`l-${cat.id}`} className="absolute pointer-events-none select-none"
                  style={{ left: `${(c.endX / VIEW) * 100}%`, top: `${(c.endY / VIEW) * 100}%`,
                    transform: c.isRight ? 'translate(10px, -50%)' : 'translate(calc(-100% - 10px), -50%)', zIndex: lit ? 30 : 10 }}>
                  <motion.div animate={{ opacity: lit ? 1 : 0.45 }} transition={{ duration: 0.3 }}
                    className={c.isRight ? 'text-left' : 'text-right'}>
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap"
                      style={{ flexDirection: c.isRight ? 'row' : 'row-reverse' }}>
                      <span className={`text-[11px] sm:text-xs font-semibold transition-colors duration-300 ${lit ? 'text-white' : 'text-gray-500'}`}>
                        {cat.short}</span>
                      <span className="text-xs sm:text-sm font-bold" style={{ color: cat.color }}>{pct}%</span>
                    </div>
                    <div className={`text-[9px] sm:text-[10px] transition-colors duration-300 mt-0.5 ${lit ? 'text-gray-300' : 'text-gray-600'}`}>
                      {cat.skills.length} skills</div>
                    <AnimatePresence>
                      {lit && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          className="overflow-hidden mt-1.5">
                          <div className="flex flex-wrap gap-1" style={{ maxWidth: 220, justifyContent: c.isRight ? 'flex-start' : 'flex-end' }}>
                            {cat.skills.map((skill, j) => (
                              <motion.span key={skill} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25, delay: j * 0.015 }}
                                className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-medium border whitespace-nowrap"
                                style={{ color: cat.color, borderColor: `${cat.color}30`, background: `${cat.color}10` }}>
                                {skill}</motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {isMobile && (
          <div className="mb-6 min-h-[100px]">
            <AnimatePresence mode="wait">
              {dc && <MobileSkillsPanel key={dc.id} category={dc} />}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}
