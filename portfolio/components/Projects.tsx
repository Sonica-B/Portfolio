'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  {
    title: 'Multi-Agent Immigration Document Validation',
    subtitle: 'GQP at WPI x Crossing',
    description: 'Built multi-agent RAG pipeline for H-1B workflows with deterministic validation. Reduced review cycle from 3-4 days to under 5 minutes with 95-99% structural accuracy.',
    tech: ['LangGraph', 'AWS Bedrock', 'Pydantic', 'Lambda', 'S3'],
    metrics: ['95-99% accuracy', '5 min processing', '70% cost reduction'],
    color: 'primary',
    period: 'Aug 2025 - Dec 2025',
    link: 'https://github.com/Sonica-B',
  },
  {
    title: 'MADWE: Multi-Agent Diffusion World Engine',
    subtitle: 'Real-Time Game Asset Generation',
    description: 'Architected real-time orchestration layer routing work to specialist agents over shared World State Graph. Achieved 120 textures/min with FID 12.3 and 94% tileability.',
    tech: ['PyTorch', 'ONNX', 'TensorRT', 'Unity', 'LoRA'],
    metrics: ['120 assets/min', '60 FPS', '73% time saved'],
    color: 'accent',
    period: 'Mar 2025 - Aug 2025',
    link: 'https://github.com/Sonica-B',
  },
  {
    title: 'Einstein Vision: 3D Autonomous Vehicle Viz',
    subtitle: 'Tesla FSD-Inspired Visualization',
    description: 'Built end-to-end visualization system for real-time 3D traffic scene rendering using Tesla Model S sensor data. Integrated Depth Anything, Mask R-CNN, and Detic.',
    tech: ['OpenCV', 'PyTorch', 'Blender', 'OpenPifPaf', 'Depth Anything'],
    metrics: ['75% realism boost', '50% accuracy gain', '13 sequences'],
    color: 'primary',
    period: 'Mar 2025 - Apr 2025',
    link: 'https://github.com/Sonica-B',
  },
  {
    title: 'TumorLytix: Brain Tumor Detection',
    subtitle: 'Unsupervised Medical Imaging',
    description: 'Designed deep learning solution for brain tumor segmentation using CycleGAN and diffusion models on 65,072 MRI samples. Achieved 90%+ segmentation accuracy.',
    tech: ['TensorFlow', 'PyTorch', 'CycleGAN', 'OpenCV', 'Diffusion'],
    metrics: ['90%+ accuracy', '65K MRI images', '15% improvement'],
    color: 'accent',
    period: 'Feb 2025 - Mar 2025',
    link: 'https://github.com/Sonica-B',
  },
  {
    title: 'VIO: Visual-Inertial Odometry',
    subtitle: 'Deep Multimodal Fusion',
    description: 'Developed time series models using FlowNet CNN, bi-LSTM and Transformer fusion for robot localization. Deployed with TensorRT achieving 35% latency reduction.',
    tech: ['PyTorch', 'FlowNet', 'bi-LSTM', 'Transformer', 'TensorRT'],
    metrics: ['RMSE 7.9-12.1', '35% faster', '20% less VRAM'],
    color: 'primary',
    period: 'Apr 2025 - May 2025',
    link: 'https://github.com/Sonica-B',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div
        className={`
          bg-surface border border-surface-light rounded-xl p-6 h-full
          transition-all duration-300 card-3d
          ${isHovered ? `border-${project.color} shadow-glow-${project.color}` : ''}
        `}
        style={{
          boxShadow: isHovered
            ? project.color === 'primary'
              ? '0 0 30px rgba(0, 212, 255, 0.2)'
              : '0 0 30px rgba(168, 85, 247, 0.2)'
            : 'none'
        }}
      >
        {/* Period Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs px-3 py-1 rounded-full bg-${project.color}/10 text-${project.color}`}
                style={{
                  backgroundColor: project.color === 'primary' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(168, 85, 247, 0.1)',
                  color: project.color === 'primary' ? '#00d4ff' : '#a855f7'
                }}>
            {project.period}
          </span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-primary transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-gray-500 mb-4">{project.subtitle}</p>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.metrics.map((metric, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded bg-surface-light text-gray-300"
            >
              {metric}
            </span>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded border border-surface-light text-gray-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">{'>'}</span> Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent"></div>
          <p className="text-gray-400 mt-4 max-w-2xl">
            Showcasing production-grade AI systems, from multi-agent workflows to real-time computer vision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
