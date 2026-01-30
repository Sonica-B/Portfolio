'use client'

import { motion } from 'framer-motion'

interface SkillsSectionProps {
  onBack: () => void
}

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: '🧠',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'Keras', 'Hugging Face', 'LangGraph', 'LangChain', 'LLMs', 'RAG', 'Diffusion Models', 'CycleGANs', 'Computer Vision'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: ['AWS (S3, Lambda, Bedrock)', 'Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'CI/CD', 'MLflow', 'Kubernetes', 'Grafana'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Programming',
    icon: '💻',
    skills: ['Python', 'C++', 'C#', 'Java', 'R', 'Rust', 'SQL', 'Bash', 'PowerShell'],
    gradient: 'from-emerald-500 to-cyan-600',
  },
  {
    title: 'Frameworks & Tools',
    icon: '🔧',
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
      className="min-h-screen py-20 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={onBack}
            className="glass-button text-sm mb-6 flex items-center gap-2"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Tech Stack</span>
          </h1>
          <p className="text-gray-400 text-lg">
            The tools and technologies I work with.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="floating-card p-6 group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.02 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 rounded-xl text-sm bg-white/5 text-gray-300 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-default"
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
          className="floating-card p-6 mt-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🎓</span> Education
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-2 border-cyan-500 pl-4">
              <p className="text-primary text-sm">Aug 2024 - May 2026</p>
              <h4 className="text-lg font-semibold text-white">M.S. in Artificial Intelligence</h4>
              <p className="text-gray-400">Worcester Polytechnic Institute</p>
              <p className="text-accent text-sm mt-1">GPA: 3.88/4.0</p>
              <p className="text-gray-500 text-xs mt-2">
                Generative AI, Computer Vision, Deep Learning, LLMs, MLOps
              </p>
            </div>
            <div className="border-l-2 border-purple-500 pl-4">
              <p className="text-accent text-sm">Jun 2018 - May 2022</p>
              <h4 className="text-lg font-semibold text-white">B.E. in Information Technology</h4>
              <p className="text-gray-400">PES Modern College of Engineering</p>
              <p className="text-gray-500 text-xs mt-2">
                Honors in AI and Machine Learning
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
