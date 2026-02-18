'use client'

import { motion } from 'framer-motion'

// Abstract SVG visual per project domain
function ProjectVisual({ type, gradient }: { type: string; gradient: string[] }) {
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1 } }

  switch (type) {
    case 'network':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id={`g-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          {/* Connected agent nodes */}
          <motion.path d="M30 60 L60 30 L90 60 L60 90 Z" fill="none" stroke={`url(#g-${type})`} strokeWidth="1.5"
            variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 1.2 }} />
          <motion.path d="M60 30 L60 90 M30 60 L90 60" fill="none" stroke={`url(#g-${type})`} strokeWidth="1" strokeDasharray="4 3"
            variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} />
          {[{ cx: 30, cy: 60 }, { cx: 60, cy: 30 }, { cx: 90, cy: 60 }, { cx: 60, cy: 90 }, { cx: 60, cy: 60 }].map((p, i) => (
            <motion.circle key={i} cx={p.cx} cy={p.cy} r="4" fill={gradient[i % 2 === 0 ? 0 : 1]}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1, type: 'spring' }} />
          ))}
        </svg>
      )
    case 'diffusion':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id={`g-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          {/* Wavy noise-to-image lines */}
          {[20, 40, 60, 80, 100].map((y, i) => (
            <motion.path key={i} d={`M10 ${y} Q30 ${y - 15 + i * 3} 50 ${y} T90 ${y} T110 ${y}`}
              fill="none" stroke={`url(#g-${type})`} strokeWidth="1.5" strokeLinecap="round"
              variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15 }} />
          ))}
        </svg>
      )
    case 'depth':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id={`g-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          {/* Layered depth perspective trapezoids */}
          {[{ s: 50, o: 0.9 }, { s: 38, o: 0.6 }, { s: 26, o: 0.35 }].map((p, i) => (
            <motion.rect key={i} x={60 - p.s / 2} y={60 - p.s / 2} width={p.s} height={p.s}
              fill="none" stroke={`url(#g-${type})`} strokeWidth="1.5" opacity={p.o} rx="3"
              initial={{ scale: 0, rotate: -10 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.2, type: 'spring' }} />
          ))}
          <motion.path d="M35 35 L47 47 M85 35 L73 47 M35 85 L47 73 M85 85 L73 73"
            fill="none" stroke={`url(#g-${type})`} strokeWidth="1" strokeDasharray="3 3"
            variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.5 }} />
        </svg>
      )
    case 'scan':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id={`g-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          {/* Concentric scan circles */}
          {[15, 25, 35, 45].map((r, i) => (
            <motion.circle key={i} cx="60" cy="60" r={r} fill="none" stroke={`url(#g-${type})`}
              strokeWidth="1.2" opacity={0.9 - i * 0.15}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }} />
          ))}
          {/* Sweep line */}
          <motion.line x1="60" y1="60" x2="60" y2="15" stroke={gradient[0]} strokeWidth="2"
            initial={{ rotate: 0 }} whileInView={{ rotate: 360 }} viewport={{ once: true }}
            transition={{ duration: 3, ease: 'linear' }}
            style={{ transformOrigin: '60px 60px' }} />
        </svg>
      )
    case 'trajectory':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id={`g-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          {/* Curved dotted trajectory path */}
          <motion.path d="M15 100 Q30 50 60 60 T105 20" fill="none" stroke={`url(#g-${type})`}
            strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round"
            variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 1.5 }} />
          {/* Waypoints */}
          {[{ x: 15, y: 100 }, { x: 45, y: 55 }, { x: 75, y: 45 }, { x: 105, y: 20 }].map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r="3" fill={gradient[i % 2]}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15, type: 'spring' }} />
          ))}
        </svg>
      )
    case 'robotic':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id={`g-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          {/* Angular arm segments */}
          <motion.path d="M30 95 L45 65 L70 55 L95 35" fill="none" stroke={`url(#g-${type})`}
            strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 1 }} />
          {/* Joints */}
          {[{ x: 30, y: 95 }, { x: 45, y: 65 }, { x: 70, y: 55 }, { x: 95, y: 35 }].map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r={i === 0 ? 5 : 3.5} fill="none"
              stroke={gradient[0]} strokeWidth="1.5"
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1, type: 'spring' }} />
          ))}
          {/* Gripper */}
          <motion.path d="M92 32 L100 25 M92 38 L100 42" fill="none" stroke={gradient[1]} strokeWidth="1.5" strokeLinecap="round"
            variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.8 }} />
        </svg>
      )
    case 'triage':
      return (
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <linearGradient id={`g-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradient[0]} />
              <stop offset="100%" stopColor={gradient[1]} />
            </linearGradient>
          </defs>
          {/* Decision tree / flowchart */}
          <motion.path d="M60 15 L60 40 M60 40 L30 60 M60 40 L90 60 M30 60 L30 85 M90 60 L75 85 M90 60 L105 85"
            fill="none" stroke={`url(#g-${type})`} strokeWidth="1.5" strokeLinecap="round"
            variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 1.2 }} />
          {/* Nodes */}
          {[{ x: 60, y: 15 }, { x: 60, y: 40 }, { x: 30, y: 60 }, { x: 90, y: 60 }, { x: 30, y: 85 }, { x: 75, y: 85 }, { x: 105, y: 85 }].map((p, i) => (
            <motion.circle key={i} cx={p.x} cy={p.y} r="4" fill={i < 2 ? gradient[0] : gradient[1]}
              initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08, type: 'spring' }} />
          ))}
        </svg>
      )
    default:
      return null
  }
}

const projects = [
  {
    title: 'Multi-Agent Immigration Document Validation',
    subtitle: 'GQP at WPI x Crossing',
    description: 'Multi-agent RAG pipeline for H-1B workflows with deterministic validation. Reduced review cycle from 3-4 days to under 5 minutes.',
    tech: ['LangGraph', 'AWS Bedrock', 'Pydantic', 'Lambda'],
    metrics: ['95-99% accuracy', '5 min processing', '70% cost reduction'],
    gradient: 'from-cyan-500 to-blue-600',
    gradientColors: ['#06b6d4', '#2563eb'],
    period: 'Aug - Dec 2025',
    github: 'https://github.com/Sonica-B/Multi-Agent-Immigration-Doc-Validation',
    visualType: 'network' as const,
  },
  {
    title: 'MADWE: Multi-Agent Diffusion World Engine',
    subtitle: 'Real-Time Game Asset Generation',
    description: 'Architected real-time orchestration routing work to specialist agents over shared World State Graph with budget-aware scheduling.',
    tech: ['PyTorch', 'ONNX', 'TensorRT', 'Unity', 'LoRA'],
    metrics: ['120 assets/min', '60 FPS', '73% time saved'],
    gradient: 'from-purple-500 to-pink-600',
    gradientColors: ['#a855f7', '#db2777'],
    period: 'Mar - Aug 2025',
    github: 'https://github.com/Sonica-B/RealmWeaver-MADWE',
    visualType: 'diffusion' as const,
  },
  {
    title: 'Einstein Vision: 3D Autonomous Vehicle Viz',
    subtitle: 'Tesla FSD-Inspired System',
    description: 'End-to-end visualization for real-time 3D traffic scene rendering using Tesla Model S sensor data with depth estimation and pose mapping.',
    tech: ['OpenCV', 'PyTorch', 'Blender', 'Depth Anything'],
    metrics: ['75% realism boost', '50% accuracy gain'],
    gradient: 'from-emerald-500 to-cyan-600',
    gradientColors: ['#10b981', '#0891b2'],
    period: 'Mar - Apr 2025',
    github: 'https://github.com/Sonica-B/EinsteinVision',
    visualType: 'depth' as const,
  },
  {
    title: 'TumorLytix: Brain Tumor Detection',
    subtitle: 'Unsupervised Medical Imaging',
    description: 'Deep learning solution for brain tumor segmentation using CycleGAN and diffusion models on 65,072 MRI samples.',
    tech: ['TensorFlow', 'PyTorch', 'CycleGAN', 'Diffusion'],
    metrics: ['90%+ accuracy', '65K MRI images', '15% improvement'],
    gradient: 'from-orange-500 to-red-600',
    gradientColors: ['#f97316', '#dc2626'],
    period: 'Feb - Mar 2025',
    github: 'https://github.com/Sonica-B/TumorLytix',
    visualType: 'scan' as const,
  },
  {
    title: 'VIO: Visual-Inertial Odometry',
    subtitle: 'Deep Multimodal Fusion',
    description: 'Time series models using FlowNet CNN, bi-LSTM and Transformer fusion for robot localization with TensorRT deployment.',
    tech: ['PyTorch', 'FlowNet', 'bi-LSTM', 'TensorRT'],
    metrics: ['RMSE 7.9-12.1', '35% faster', '20% less VRAM'],
    gradient: 'from-violet-500 to-purple-600',
    gradientColors: ['#8b5cf6', '#9333ea'],
    period: 'Apr - May 2025',
    github: 'https://github.com/Sonica-B/VIO',
    visualType: 'trajectory' as const,
  },
  {
    title: 'RoboFusion: ML-Driven Robotic Arm Control',
    subtitle: 'ROS2 + Computer Vision',
    description: 'ML-powered robotic arm with real-time object detection, grasp planning, and ROS2 integration for autonomous pick-and-place tasks.',
    tech: ['ROS2', 'PyTorch', 'OpenCV', 'MoveIt2', 'Gazebo'],
    metrics: ['Real-time control', '92% grasp rate', 'Sim-to-real'],
    gradient: 'from-teal-500 to-emerald-600',
    gradientColors: ['#14b8a6', '#059669'],
    period: '2025',
    github: 'https://github.com/Sonica-B/RoboFusion',
    visualType: 'robotic' as const,
  },
  {
    title: 'Medical-Triage-HIL',
    subtitle: 'LLM for Emergency Triage',
    description: 'Human-in-the-loop LLM system for emergency medical triage with confidence-aware routing and difficulty-weighted training.',
    tech: ['LLMs', 'PyTorch', 'Scikit-Learn', 'FastAPI'],
    metrics: ['20% precision gain', '60% detection boost', '50% less errors'],
    gradient: 'from-rose-500 to-orange-600',
    gradientColors: ['#f43f5e', '#ea580c'],
    period: '2025',
    github: 'https://github.com/Sonica-B/Medical-Triage-HIL',
    visualType: 'triage' as const,
  },
]

export default function ProjectsSection() {
  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
            From multi-agent AI systems to computer vision and medical imaging.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
              className="floating-card p-4 sm:p-6 group relative overflow-hidden"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

              {/* Abstract SVG Visual - background decoration */}
              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
                <ProjectVisual type={project.visualType} gradient={project.gradientColors} />
              </div>

              <div className="relative z-10">
                {/* Period Badge + GitHub Link */}
                <div className="flex items-center justify-between mb-3 sm:mb-0">
                  <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                    {project.period}
                  </span>
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/25 transition-all"
                      title="View on GitHub"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </motion.a>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-xl font-bold text-white mt-3 sm:mt-4 mb-1 pr-2">{project.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{project.subtitle}</p>

                {/* Description */}
                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">{project.description}</p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {project.metrics.map((metric, i) => (
                    <span key={i} className="text-[10px] sm:text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-300">
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-[10px] sm:text-xs px-2 py-1 rounded-lg border border-white/10 text-gray-500">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
