'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    icon: '🧠',
    skills: [
      'PyTorch', 'TensorFlow', 'Scikit-Learn', 'Keras', 'Hugging Face',
      'LangGraph', 'LangChain', 'LLMs', 'RAG', 'Diffusion Models',
      'CycleGANs', 'NeRF', 'Computer Vision', 'NLP'
    ],
    color: 'primary',
  },
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      'AWS (S3, Lambda, Bedrock)', 'Azure DevOps', 'Docker', 'Terraform',
      'CI/CD Pipelines', 'MLflow', 'Kubernetes', 'Grafana', 'Prometheus'
    ],
    color: 'accent',
  },
  {
    title: 'Programming',
    icon: '💻',
    skills: [
      'Python', 'C++', 'C#', 'Java', 'R', 'Rust',
      'React', 'Angular', 'SQL', 'Bash', 'PowerShell'
    ],
    color: 'primary',
  },
  {
    title: 'Tools & Frameworks',
    icon: '🔧',
    skills: [
      'OpenCV', 'Unity', 'Blender', 'ONNX', 'TensorRT',
      'CUDA', 'Git', 'PostgreSQL', 'MongoDB', 'Flask'
    ],
    color: 'accent',
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-surface/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">{'>'}</span> Tech Stack
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="bg-surface border border-surface-light rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.02 }}
                    whileHover={{ scale: 1.05 }}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm cursor-default
                      transition-all duration-200
                      ${category.color === 'primary'
                        ? 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40'
                        : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:border-accent/40'
                      }
                    `}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-surface border border-surface-light rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">🎓 Education</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-2 border-primary pl-4">
              <p className="text-primary text-sm">Aug 2024 - May 2026</p>
              <h4 className="text-lg font-semibold text-white">M.S. in Artificial Intelligence</h4>
              <p className="text-gray-400">Worcester Polytechnic Institute (WPI)</p>
              <p className="text-accent text-sm mt-1">GPA: 3.88/4.0</p>
              <p className="text-gray-500 text-xs mt-2">
                Coursework: Generative AI, Computer Vision, Deep Learning, LLMs, MLOps
              </p>
            </div>
            <div className="border-l-2 border-accent pl-4">
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
    </section>
  )
}
