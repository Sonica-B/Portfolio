'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const linkedInPosts = [
  {
    id: 'post1',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7422436984255598592?collapsed=1',
    height: 668,
  },
  {
    id: 'post2',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7437006111011979264',
    height: 704,
  },
  {
    id: 'post3',
    embedUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7430099787481468929?collapsed=1',
    height: 486,
  },
]

export default function LinkedInHighlights() {
  const [currentPost, setCurrentPost] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="mt-4 sm:mt-5 block max-w-md w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '14px',
        padding: '10px 10px 6px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" className="flex-shrink-0" aria-hidden="true">
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
      <div className="rounded-lg overflow-hidden" style={{ maxHeight: '280px' }}>
        <iframe
          key={linkedInPosts[currentPost].id}
          src={linkedInPosts[currentPost].embedUrl}
          height={linkedInPosts[currentPost].height}
          width="100%"
          frameBorder="0"
          allowFullScreen
          title="LinkedIn post"
          className="w-full"
          style={{ maxHeight: '280px', border: 'none', borderRadius: '8px' }}
        />
      </div>
    </motion.div>
  )
}
