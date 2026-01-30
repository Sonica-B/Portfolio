'use client'

import { motion } from 'framer-motion'

const experiences = [
  {
    title: 'Machine Learning Engineer',
    company: 'Crossing x WPI (Industry GQP)',
    location: 'Worcester, MA',
    period: 'Aug 2025 - Dec 2025',
    description: [
      'Led sponsor-facing delivery with company engineers, drove requirements to acceptance tests',
      'Built multi-agent document intelligence system for H-1B workflows with AWS pipeline',
      'Achieved 95-99% structural accuracy, reduced manual verification by 70-90%',
      'Delivered automated processing in 10 minutes, saving 3-4 days per petition',
    ],
    tech: ['LangGraph', 'AWS Bedrock', 'Lambda', 'S3', 'Pydantic'],
  },
  {
    title: 'Machine Learning Research Assistant',
    company: 'Worcester Polytechnic Institute',
    location: 'Worcester, MA',
    period: 'Jan 2025 - Aug 2025',
    description: [
      'Built confidence-aware triage orchestration, raising precision 20% and cutting false escalations 40%',
      'Engineered dual-channel AI workflows reducing miscommunication by 50%',
      'Enhanced early critical case detection by 60% with LLM-driven queries',
      'Implemented difficulty-weighted training improving reliability by 35%',
    ],
    tech: ['PyTorch', 'Scikit-Learn', 'LLMs', 'GPT-T Metrics'],
  },
  {
    title: 'Lead DevOps Engineer',
    company: 'Persistent Systems',
    location: 'Pune, India',
    period: 'Jun 2022 - Jul 2024',
    description: [
      'Achieved 95% faster deployments building CI/CD pipelines in Azure DevOps & Terraform',
      'Reduced manual configuration 70% standardizing VM provisioning across 20+ projects',
      'Improved system uptime 25% deploying Grafana and Prometheus dashboards',
      'Received Top Talent 2024 & Bravo Individual Awards for automation excellence',
    ],
    tech: ['Azure DevOps', 'Docker', 'Terraform', 'Ansible', 'Grafana'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">{'>'}</span> Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-surface-light"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10"></div>

              {/* Content */}
              <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-surface border border-surface-light rounded-xl p-6 hover:border-primary/50 transition-colors">
                  <span className="text-xs text-primary mb-2 block">{exp.period}</span>
                  <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                  <p className="text-accent text-sm mb-1">{exp.company}</p>
                  <p className="text-gray-500 text-xs mb-4">{exp.location}</p>

                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-gray-400 text-sm flex items-start">
                        <span className="text-primary mr-2">▹</span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded bg-surface-light text-gray-400"
                      >
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
    </section>
  )
}
