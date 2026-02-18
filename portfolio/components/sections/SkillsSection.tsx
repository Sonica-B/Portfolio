'use client'

import { useState, useEffect } from 'react'
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
    title: 'AI & ML',
    icon: 'ai',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Keras', 'Hugging Face', 'LangGraph', 'LangChain', 'LLMs', 'RAG', 'Diffusion Models', 'CycleGANs', 'Computer Vision'],
    color: '#06b6d4',
    radius: 140,
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['AWS (S3, Lambda, Bedrock)', 'Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'CI/CD', 'MLflow', 'Kubernetes', 'Grafana'],
    color: '#a855f7',
    radius: 200,
  },
  {
    title: 'Programming',
    icon: 'code',
    skills: ['Python', 'C++', 'C#', 'Java', 'R', 'Rust', 'SQL', 'Bash', 'PowerShell'],
    color: '#10b981',
    radius: 255,
  },
  {
    title: 'Frameworks & Tools',
    icon: 'tools',
    skills: ['React', 'Angular', 'Flask', 'FastAPI', 'OpenCV', 'ROS2', 'Unity', 'Blender', 'ONNX', 'TensorRT', 'CUDA', 'Git'],
    color: '#f97316',
    radius: 310,
  },
]

const maxSkills = Math.max(...skillCategories.map(c => c.skills.length))

// Generate positions for skill nodes along an arc
function getArcPositions(cx: number, cy: number, radius: number, count: number) {
  const startAngle = -210 * (Math.PI / 180) // Start from top-left
  const sweepAngle = 300 * (Math.PI / 180)  // Sweep 300 degrees

  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (i / (count - 1 || 1)) * sweepAngle
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
    }
  })
}

// Desktop: Concentric Rings SVG Visualization
function ConcentricRings() {
  const [hoveredRing, setHoveredRing] = useState<number | null>(null)
  const cx = 350
  const cy = 350
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }

  return (
    <div className="flex justify-center">
      <svg viewBox="0 0 700 700" style={{ width: 'min(700px, 90vw)', height: 'auto' }}>
        {/* Center hub */}
        <motion.circle
          cx={cx} cy={cy} r={55}
          fill="rgba(15,15,25,0.9)"
          stroke="url(#hubGlow)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        />
        <motion.text
          x={cx} y={cy - 6}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Tech
        </motion.text>
        <motion.text
          x={cx} y={cy + 12}
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Stack
        </motion.text>

        <defs>
          <linearGradient id="hubGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>

        {/* Concentric ring arcs */}
        {skillCategories.map((cat, ringIdx) => {
          const isHovered = hoveredRing === ringIdx
          const isDimmed = hoveredRing !== null && hoveredRing !== ringIdx
          const nodePositions = getArcPositions(cx, cy, cat.radius, cat.skills.length)

          return (
            <g
              key={ringIdx}
              onMouseEnter={() => setHoveredRing(ringIdx)}
              onMouseLeave={() => setHoveredRing(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Ring arc */}
              <motion.circle
                cx={cx} cy={cy} r={cat.radius}
                fill="none"
                stroke={cat.color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                opacity={isDimmed ? 0.15 : isHovered ? 0.8 : 0.35}
                strokeDasharray="6 4"
                variants={draw}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 + ringIdx * 0.2 }}
                style={{ transition: 'opacity 0.3s, stroke-width 0.3s' }}
              />

              {/* Domain label */}
              <motion.text
                x={cx}
                y={cy - cat.radius - 10}
                textAnchor="middle"
                fill={cat.color}
                fontSize="11"
                fontWeight="600"
                opacity={isDimmed ? 0.2 : 0.8}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: isDimmed ? 0.2 : 0.8 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + ringIdx * 0.2 }}
                style={{ transition: 'opacity 0.3s' }}
              >
                {cat.title}
              </motion.text>

              {/* Skill nodes + labels */}
              {nodePositions.map((pos, skillIdx) => (
                <g key={skillIdx}>
                  <motion.circle
                    cx={pos.x} cy={pos.y} r={4}
                    fill={cat.color}
                    opacity={isDimmed ? 0.15 : 0.9}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + ringIdx * 0.2 + skillIdx * 0.05, type: 'spring' }}
                    style={{ transition: 'opacity 0.3s' }}
                  />

                  {/* Skill label via foreignObject */}
                  <motion.foreignObject
                    x={pos.x - 40} y={pos.y + 6}
                    width={80} height={24}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: isDimmed ? 0.1 : 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 + ringIdx * 0.2 + skillIdx * 0.05 }}
                    style={{ transition: 'opacity 0.3s' }}
                  >
                    <div
                      className="text-center text-[8px] leading-tight px-1 py-0.5 rounded bg-black/40 text-gray-300 border border-white/5 truncate"
                      title={cat.skills[skillIdx]}
                    >
                      {cat.skills[skillIdx]}
                    </div>
                  </motion.foreignObject>
                </g>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// Mobile: Stacked domain bars with skill pills
function StackedBars() {
  return (
    <div className="space-y-4">
      {skillCategories.map((cat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="floating-card p-4 group"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <CategoryIcon type={cat.icon} />
            <h3 className="text-sm font-bold text-white flex-1">{cat.title}</h3>
            <span className="text-[10px] text-gray-500">{cat.skills.length} skills</span>
          </div>

          {/* Animated fill bar */}
          <div className="h-1.5 rounded-full bg-white/5 mb-3 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: cat.color }}
              initial={{ width: 0 }}
              whileInView={{ width: `${(cat.skills.length / maxSkills) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: 'easeOut' }}
            />
          </div>

          {/* Skill pills */}
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.4 + index * 0.1 + i * 0.03 }}
                className="px-2 py-1 rounded-lg text-xs bg-white/5 text-gray-300 border border-white/10"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function SkillsSection() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
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

        {/* Responsive visualization */}
        {isMobile ? <StackedBars /> : <ConcentricRings />}
      </div>
    </div>
  )
}
