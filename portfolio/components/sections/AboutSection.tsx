'use client'

import { motion } from 'framer-motion'

interface AboutSectionProps {
  onBack: () => void
}

const stats = [
  { value: '3.88', label: 'GPA', icon: '📚' },
  { value: '2+', label: 'Years Exp', icon: '💼' },
  { value: '20+', label: 'Projects', icon: '🚀' },
  { value: '95%', label: 'Accuracy', icon: '🎯' },
]

const awards = [
  { title: 'Top Talent 2024', company: 'Persistent Systems', icon: '🏆' },
  { title: 'Bravo Individual Award', company: 'Persistent Systems', icon: '⭐' },
]

export default function AboutSection({ onBack }: AboutSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 px-4 md:px-8"
    >
      <div className="max-w-4xl mx-auto">
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
            <span className="gradient-text">About Me</span>
          </h1>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 floating-card p-6"
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">👩‍💻</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Shreya Boyane</h2>
                <p className="text-primary">AI/ML Engineer</p>
                <p className="text-gray-500 text-sm">Worcester, MA</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                I&apos;m a <span className="text-primary">Machine Learning Engineer</span> with 2+ years of DevOps experience,
                currently pursuing my M.S. in Artificial Intelligence at <span className="text-accent">Worcester Polytechnic Institute</span>.
              </p>
              <p>
                I specialize in building <span className="text-primary">production-grade Agentic AI workflows</span>,
                adaptive LLM systems, and Generative AI solutions. My work spans from multi-agent document intelligence
                systems to real-time computer vision applications.
              </p>
              <p>
                When I&apos;m not training models or debugging pipelines, you&apos;ll find me exploring the latest in AI research
                and figuring out how to make machines a little smarter (and a lot more useful).
              </p>
            </div>

            {/* Quick Contact */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Email</p>
                  <a href="mailto:shreyaa.boyane@gmail.com" className="text-primary hover:underline">
                    shreyaa.boyane@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-gray-500">Phone</p>
                  <a href="tel:+17745199905" className="text-primary hover:underline">
                    +1 (774) 519-9905
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="floating-card p-6"
          >
            <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5"
                >
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-gray-500 text-xs">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Awards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="floating-card p-6 mt-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>🏅</span> Awards & Recognition
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {awards.map((award, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-white/5">
                <span className="text-3xl">{award.icon}</span>
                <div>
                  <p className="text-white font-medium">{award.title}</p>
                  <p className="text-gray-500 text-sm">{award.company}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="floating-card p-6 mt-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span> What Drives Me
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div className="p-4 rounded-xl bg-white/5">
              <span className="text-2xl block mb-2">🔬</span>
              Turning research papers into production systems
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="text-2xl block mb-2">🤖</span>
              Making AI that actually helps people
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <span className="text-2xl block mb-2">⚡</span>
              Optimizing everything, from code to coffee
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
