'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

function CategoryIcon({ type }: { type: string }) {
  switch (type) {
    case 'ai':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      )
    case 'cloud':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
        </svg>
      )
    case 'code':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    case 'tools':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    default:
      return null
  }
}

const skillCategories = [
  {
    id: 'ai',
    title: 'AI & ML',
    icon: 'ai',
    color: '#06b6d4',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Keras', 'Hugging Face', 'LangGraph', 'LangChain', 'LLMs', 'RAG', 'Diffusion Models', 'CycleGANs', 'Computer Vision'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    icon: 'cloud',
    color: '#a855f7',
    skills: ['AWS (S3, Lambda, Bedrock)', 'Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'CI/CD', 'MLflow', 'Kubernetes', 'Grafana'],
  },
  {
    id: 'code',
    title: 'Programming',
    icon: 'code',
    color: '#10b981',
    skills: ['Python', 'C++', 'C#', 'Java', 'R', 'Rust', 'SQL', 'Bash', 'PowerShell'],
  },
  {
    id: 'tools',
    title: 'Frameworks & Tools',
    icon: 'tools',
    color: '#f97316',
    skills: ['React', 'Angular', 'Flask', 'FastAPI', 'OpenCV', 'ROS2', 'Unity', 'Blender', 'ONNX', 'TensorRT', 'CUDA', 'Git'],
  },
]

const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0)

function CategoryCard({ category, index, isMobile }: {
  category: typeof skillCategories[number]
  index: number
  isMobile: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const el = cardRef.current
    el.style.setProperty('--rx', `${(y - 0.5) * -8}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--rx', '0deg')
    cardRef.current.style.setProperty('--ry', '0deg')
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group/card relative rounded-2xl h-full"
        style={{
          transform: isMobile ? 'none' : 'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {/* Dynamic border glow - brightens at cursor position */}
        <div
          className="absolute -inset-px rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), ${category.color}50, ${category.color}08 50%, transparent 70%)`,
          }}
        />

        {/* Card body */}
        <div
          className="relative h-full rounded-2xl border border-white/[0.08] group-hover/card:border-transparent transition-colors duration-500 p-4 sm:p-5"
          style={{ background: 'rgba(10, 10, 20, 0.85)', backdropFilter: 'blur(20px)' }}
        >
          {/* Internal cursor spotlight */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), ${category.color}10, transparent 60%)`
            }}
          />

          {/* Top accent line */}
          <motion.div
            className="absolute top-0 left-6 right-6 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${category.color}40, transparent)` }}
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 + index * 0.12 }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${category.color}12`, border: `1px solid ${category.color}20` }}
              >
                <CategoryIcon type={category.icon} />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">{category.title}</h3>
              <span
                className="ml-auto text-[10px] font-mono px-2 py-0.5 rounded-md flex-shrink-0"
                style={{ color: category.color, background: `${category.color}10`, border: `1px solid ${category.color}15` }}
              >
                {category.skills.length}
              </span>
            </div>

            {/* Skill pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {category.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.08 + i * 0.03 }}
                  whileHover={{ scale: 1.06 }}
                  className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs text-gray-400 hover:text-white border border-white/[0.06] hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] cursor-default transition-all duration-200"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleGridMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return
    const rect = gridRef.current.getBoundingClientRect()
    gridRef.current.style.setProperty('--grid-mx', `${e.clientX - rect.left}px`)
    gridRef.current.style.setProperty('--grid-my', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8">
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
            <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            The tools and technologies I work with.
          </p>
        </motion.div>

        {/* Grid with ambient cursor spotlight */}
        <div
          ref={gridRef}
          onMouseMove={!isMobile ? handleGridMouseMove : undefined}
          className="group/grid relative"
        >
          {/* Ambient grid-level spotlight */}
          {!isMobile && (
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover/grid:opacity-100 transition-opacity duration-700 rounded-3xl"
              style={{
                background: 'radial-gradient(600px circle at var(--grid-mx, 50%) var(--grid-my, 50%), rgba(6, 182, 212, 0.04), transparent 40%)'
              }}
            />
          )}

          {/* Category cards in bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 relative">
            {skillCategories.map((cat, i) => (
              <CategoryCard key={cat.id} category={cat} index={i} isMobile={isMobile} />
            ))}
          </div>

          {/* Summary */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-600 text-xs">
              {totalSkills} technologies across {skillCategories.length} domains
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
