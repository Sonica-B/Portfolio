'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface LinkedInPost {
  title: string
  excerpt: string
  date: string
  likes: number
  comments: number
  url: string
}

export default function LinkedInHighlights() {
  const [post, setPost] = useState<LinkedInPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatestPost() {
      try {
        const res = await fetch('/api/linkedin')
        if (res.ok) {
          const data = await res.json()
          if (data.posts && data.posts.length > 0) {
            // Get only the single most recent post
            setPost(data.posts[0])
          }
        }
      } catch (error) {
        console.error('Failed to fetch LinkedIn post:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLatestPost()
  }, [])

  // Fallback if API fails
  const displayPost = post || {
    title: 'Multi-Agent AI for Legal Tech',
    excerpt: 'Excited to share our work on automating H-1B document validation...',
    date: 'Dec 2025',
    likes: 156,
    comments: 23,
    url: 'https://linkedin.com/in/shreya-boyane',
  }

  return (
    <motion.a
      href={displayPost.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="mt-4 sm:mt-5 block group max-w-md w-full"
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
      <div className="flex items-start gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2" className="flex-shrink-0 mt-0.5">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] text-white/40 uppercase tracking-wider">Latest Post</p>
            <span className="text-[10px] text-white/30">{loading ? '' : displayPost.date}</span>
          </div>
          <p className="text-sm text-white/90 font-medium group-hover:text-cyan-400 transition-colors duration-300">
            {loading ? 'Loading...' : displayPost.title}
          </p>
          {!loading && displayPost.excerpt && (
            <p className="text-[11px] text-white/40 mt-1 line-clamp-1">
              {displayPost.excerpt}
            </p>
          )}
          {!loading && (
            <div className="flex items-center gap-4 mt-2 text-[10px] text-white/30">
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
                </svg>
                {displayPost.likes}
              </span>
              <span className="flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                {displayPost.comments}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto text-white/20 group-hover:text-cyan-400 transition-colors duration-300">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  )
}
