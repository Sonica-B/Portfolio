'use client'

import { motion } from 'framer-motion'

interface ProjectsSectionProps {
  onBack: () => void
}

const projects = [
  {
    title: 'Multi-Agent Immigration Document Validation',
    subtitle: 'GQP at WPI x Crossing',
    description: 'Multi-agent RAG pipeline for H-1B workflows with deterministic validation. Reduced review cycle from 3-4 days to under 5 minutes.',
    tech: ['LangGraph', 'AWS Bedrock', 'Pydantic', 'Lambda'],
    metrics: ['95-99% accuracy', '5 min processing', '70% cost reduction'],
    gradient: 'from-cyan-500 to-blue-600',
    period: 'Aug - Dec 2025',
  },
  {
    title: 'MADWE: Multi-Agent Diffusion World Engine',
    subtitle: 'Real-Time Game Asset Generation',
    description: 'Architected real-time orchestration routing work to specialist agents over shared World State Graph with budget-aware scheduling.',
    tech: ['PyTorch', 'ONNX', 'TensorRT', 'Unity', 'LoRA'],
    metrics: ['120 assets/min', '60 FPS', '73% time saved'],
    gradient: 'from-purple-500 to-pink-600',
    period: 'Mar - Aug 2025',
  },
  {
    title: 'Einstein Vision: 3D Autonomous Vehicle Viz',
    subtitle: 'Tesla FSD-Inspired System',
    description: 'End-to-end visualization for real-time 3D traffic scene rendering using Tesla Model S sensor data with depth estimation and pose mapping.',
    tech: ['OpenCV', 'PyTorch', 'Blender', 'Depth Anything'],
    metrics: ['75% realism boost', '50% accuracy gain'],
    gradient: 'from-emerald-500 to-cyan-600',
    period: 'Mar - Apr 2025',
  },
  {
    title: 'TumorLytix: Brain Tumor Detection',
    subtitle: 'Unsupervised Medical Imaging',
    description: 'Deep learning solution for brain tumor segmentation using CycleGAN and diffusion models on 65,072 MRI samples.',
    tech: ['TensorFlow', 'PyTorch', 'CycleGAN', 'Diffusion'],
    metrics: ['90%+ accuracy', '65K MRI images', '15% improvement'],
    gradient: 'from-orange-500 to-red-600',
    period: 'Feb - Mar 2025',
  },
  {
    title: 'VIO: Visual-Inertial Odometry',
    subtitle: 'Deep Multimodal Fusion',
    description: 'Time series models using FlowNet CNN, bi-LSTM and Transformer fusion for robot localization with TensorRT deployment.',
    tech: ['PyTorch', 'FlowNet', 'bi-LSTM', 'TensorRT'],
    metrics: ['RMSE 7.9-12.1', '35% faster', '20% less VRAM'],
    gradient: 'from-violet-500 to-purple-600',
    period: 'Apr - May 2025',
  },
]

export default function ProjectsSection({ onBack }: ProjectsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <button
            onClick={onBack}
            className="glass-button text-sm mb-4 sm:mb-6 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Home
          </button>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h1>
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="floating-card p-4 sm:p-6 group"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Period Badge */}
                <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                  {project.period}
                </span>

                {/* Title */}
                <h3 className="text-base sm:text-xl font-bold text-white mt-3 sm:mt-4 mb-1">{project.title}</h3>
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
    </motion.div>
  )
}
