'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const linkedInPosts = [
  {
    title: 'Building Agentic AI for Legal Tech',
    excerpt: 'How we automated H-1B document validation using multi-agent systems with 95-99% accuracy...',
    date: 'Jan 2026',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7422436984255598592',
  },
  {
    title: 'Scaling Diffusion Models for Game Engines',
    excerpt: 'Real-time orchestration with specialist agents over shared World State Graph...',
    date: 'Feb 2026',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7437006111011979264',
  },
  {
    title: 'From DevOps to AI Engineering',
    excerpt: 'My journey transitioning from Lead DevOps at Persistent Systems to ML research at WPI...',
    date: 'Jan 2026',
    url: 'https://www.linkedin.com/feed/update/urn:li:share:7430099787481468929',
  },
]

export default function LinkedInHighlights() {
  const [currentPost, setCurrentPost] = useState(0)
  const post = linkedInPosts[currentPost]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="mt-4 sm:mt-5 block max-w-md w-full"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '14px',
        padding: '12px 14px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      {/* Header with dots */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" className="flex-shrink-0" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Latest Posts</p>
        </div>
        <div className="flex gap-1">
          {linkedInPosts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPost(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentPost ? 'bg-[#0A66C2] w-4' : 'bg-white/20 w-1.5 hover:bg-white/40'
              }`}
              aria-label={`View post ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Post content */}
      <AnimatePresence mode="wait">
        <motion.a
          key={currentPost}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.2 }}
          className="block group"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-white/30">{post.date}</span>
          </div>
          <p className="text-sm text-white/90 font-medium group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
            {post.title}
          </p>
          <p className="text-[11px] text-white/40 mt-1 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-[10px] text-white/30 group-hover:text-cyan-400/60 transition-colors">
              Read on LinkedIn
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className="ml-1 text-white/20 group-hover:text-cyan-400 transition-colors duration-300">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </div>
        </motion.a>
      </AnimatePresence>
    </motion.div>
  )
}
