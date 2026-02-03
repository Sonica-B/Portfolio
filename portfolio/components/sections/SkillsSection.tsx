'use client'

import { motion } from 'framer-motion'

interface SkillsSectionProps {
  onBack: () => void
}

function CategoryIcon({ type }: { type: string }) {
  switch (type) {
    case 'ai':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      )
    case 'cloud':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
        </svg>
      )
    case 'code':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-400">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    case 'tools':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-orange-400">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      )
    default:
      return null
  }
}

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: 'ai',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Keras', 'Hugging Face', 'LangGraph', 'LangChain', 'LLMs', 'RAG', 'Diffusion Models', 'CycleGANs', 'Computer Vision'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['AWS (S3, Lambda, Bedrock)', 'Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'CI/CD', 'MLflow', 'Kubernetes', 'Grafana'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Programming',
    icon: 'code',
    skills: ['Python', 'C++', 'C#', 'Java', 'R', 'Rust', 'SQL', 'Bash', 'PowerShell'],
    gradient: 'from-emerald-500 to-cyan-600',
  },
  {
    title: 'Frameworks & Tools',
    icon: 'tools',
    skills: ['React', 'Angular', 'Flask', 'OpenCV', 'Unity', 'Blender', 'ONNX', 'TensorRT', 'CUDA', 'Git'],
    gradient: 'from-orange-500 to-red-600',
  },
]

export default function SkillsSection({ onBack }: SkillsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
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
            <span className="gradient-text">Tech Stack</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            The tools and technologies I work with.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="floating-card p-4 sm:p-6 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <CategoryIcon type={category.icon} />
                  <h3 className="text-base sm:text-xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.02 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="floating-card p-4 sm:p-6 mt-4 sm:mt-6"
        >
          <h3 className="text-base sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary flex-shrink-0">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Education
          </h3>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border-l-2 border-cyan-500 pl-3 sm:pl-4">
              <p className="text-primary text-xs sm:text-sm">Aug 2024 - May 2026</p>
              <h4 className="text-base sm:text-lg font-semibold text-white">M.S. in Artificial Intelligence</h4>
              <p className="text-gray-400 text-sm">Worcester Polytechnic Institute</p>
              <p className="text-accent text-xs sm:text-sm mt-1">GPA: 3.88/4.0</p>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
                Generative AI, Computer Vision, Deep Learning, LLMs, MLOps
              </p>
            </div>
            <div className="border-l-2 border-purple-500 pl-3 sm:pl-4">
              <p className="text-accent text-xs sm:text-sm">Jun 2018 - May 2022</p>
              <h4 className="text-base sm:text-lg font-semibold text-white">B.E. in Information Technology</h4>
              <p className="text-gray-400 text-sm">PES Modern College of Engineering</p>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
                Honors in AI and Machine Learning
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
