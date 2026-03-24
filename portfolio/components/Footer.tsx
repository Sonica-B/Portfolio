'use client'

import { motion } from 'framer-motion'

const footerLinks = [
  { name: 'GitHub', url: 'https://github.com/Sonica-B' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/shreya-boyane/' },
  { name: 'Google Dev', url: 'https://g.dev/shreyaboyane' },
  { name: 'Dev.to', url: 'https://dev.to/sonicab' },
  { name: 'ORCID', url: 'https://orcid.org/0009-0004-1211-3253' },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative py-8 px-4 sm:px-6 md:px-8 border-t border-white/5"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="mailto:shreyaa.boyane@gmail.com"
              className="text-xs text-gray-500 hover:text-cyan-400 transition-colors"
            >
              shreyaa.boyane@gmail.com
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Shreya Boyane
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
