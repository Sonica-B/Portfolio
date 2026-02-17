'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Machine Learning Engineer',
    company: 'Crossing x WPI (Industry GQP)',
    location: 'Worcester, MA',
    period: 'Aug 2025 - Dec 2025',
    highlights: [
      'Led sponsor-facing delivery with company engineers',
      'Built multi-agent document intelligence system for H-1B workflows',
      'Achieved 95-99% structural accuracy on covered fields',
      'Reduced processing from 3-4 days to 10 minutes',
    ],
    tech: ['LangGraph', 'AWS Bedrock', 'Lambda', 'S3', 'Pydantic'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'ML Research Assistant',
    company: 'Worcester Polytechnic Institute',
    location: 'Worcester, MA',
    period: 'Jan 2025 - Aug 2025',
    highlights: [
      'Built confidence-aware triage orchestration raising precision 20%',
      'Engineered dual-channel AI workflows reducing miscommunication 50%',
      'Enhanced early critical case detection by 60%',
      'Implemented difficulty-weighted training improving reliability 35%',
    ],
    tech: ['PyTorch', 'Scikit-Learn', 'LLMs', 'GPT-T Metrics'],
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'Lead DevOps Engineer',
    company: 'Persistent Systems',
    location: 'Pune, India',
    period: 'Jun 2022 - Jul 2024',
    highlights: [
      'Achieved 95% faster deployments with CI/CD pipelines',
      'Reduced manual configuration 70% across 20+ projects',
      'Improved system uptime 25% with monitoring dashboards',
      'Received Top Talent 2024 & Bravo Individual Awards',
    ],
    tech: ['Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'Grafana'],
    gradient: 'from-emerald-500 to-cyan-600',
  },
]

export default function ExperienceSection() {
  return (
    <div className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            2+ years building production AI systems and DevOps infrastructure.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-emerald-500 opacity-30" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative pl-10 sm:pl-20 pb-8 sm:pb-12 last:pb-0"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-2 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r ${exp.gradient} shadow-lg`} />

              {/* Card */}
              <div className="floating-card p-4 sm:p-6 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Period */}
                  <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/10">
                    {exp.period}
                  </span>

                  {/* Title & Company */}
                  <h3 className="text-base sm:text-xl font-bold text-white mt-3 sm:mt-4">{exp.title}</h3>
                  <p className="text-primary text-xs sm:text-sm">{exp.company}</p>
                  <p className="text-gray-500 text-[10px] sm:text-xs mb-3 sm:mb-4">{exp.location}</p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {exp.highlights.map((item, i) => (
                      <li key={i} className="text-gray-400 text-xs sm:text-sm flex items-start">
                        <span className="text-primary mr-2 mt-0.5 sm:mt-1 flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 11 12 14 22 4"/>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.tech.map((tech, i) => (
                      <span key={i} className="text-[10px] sm:text-xs px-2 py-1 rounded-lg border border-white/10 text-gray-500">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
