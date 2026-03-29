'use client'

import { useState, useEffect, useCallback, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const POST_URL = 'https://www.linkedin.com/feed/update/urn:li:share:7422436984255598592'

const FALLBACK = {
  authorName: 'Shreya Boyane',
  authorTitle: 'Machine Learning Engineer | Computer Vision, Generative AI, LLMs, MLOps & DevOps',
  postText: 'Still smiling about this one. 😊\n\nIn Dec 2025, I received the Data Science GQP MVP award for our project on immigration document validation.\n\nThis award means a lot because our work was not a demo. It was a real system for a real pain point.',
  imageUrl: '/images/linkedin-post.jpg',
  commentCount: 27,
  timeAgo: '1mo',
  postUrl: POST_URL,
}

export default function LinkedInHighlights() {
  const [post, setPost] = useState(FALLBACK)
  const [loaded, setLoaded] = useState(false)

  // 3D tilt
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rotateX.set(-y * 10)
    rotateY.set(x * 10)
  }, [rotateX, rotateY])

  const handleLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  useEffect(() => {
    fetch('/api/linkedin-post')
      .then(r => r.ok ? r.json() : FALLBACK)
      .then(data => { setPost(data); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  const text = post.postText.length > 140
    ? post.postText.slice(0, 140).replace(/\s+\S*$/, '') + '...'
    : post.postText
  const firstNl = text.indexOf('\n')
  const display = firstNl > 0
    ? text.slice(0, firstNl) + '\n' + text.slice(firstNl + 1).replace(/\n/g, ' ')
    : text
  const tags = (post.postText.match(/#\w+/g) || []).slice(0, 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="mt-2 block w-full relative"
      style={{ maxWidth: 320, zIndex: 50, perspective: 800 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.03, z: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative"
      >
        <a
          href={post.postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block group relative"
          style={{
            background: '#FFFFFF',
            borderRadius: 14,
            padding: 10,
            maxWidth: 320,
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div
                className="flex-shrink-0 rounded-full flex items-center justify-center"
                style={{ width: 32, height: 32, background: '#0A66C2', transform: 'translateZ(8px)' }}
              >
                <span className="text-white text-[10px] font-semibold">
                  {post.authorName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-[12px] text-[#1A1A1A] truncate">{post.authorName}</span>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="#0A66C2" className="flex-shrink-0">
                    <path d="M8 0l2.1 2.3L13 2.6l.3 2.9L16 8l-2.7 2.5-.3 2.9-2.9.3L8 16l-2.1-2.3-2.9-.3-.3-2.9L0 8l2.7-2.5.3-2.9 2.9-.3L8 0z"/>
                    <path d="M6.8 10.9L4.4 8.5l1-1 1.4 1.4L10.2 5.5l1 1-4.4 4.4z" fill="#fff"/>
                  </svg>
                </div>
                <p className="text-[10px] text-[#6B7280] truncate" style={{ maxWidth: 180 }}>{post.authorTitle}</p>
              </div>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2" className="flex-shrink-0" style={{ transform: 'translateZ(6px)' }}>
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>

          {/* Hero Image */}
          <div className="w-full overflow-hidden mb-2" style={{ borderRadius: 8, transform: 'translateZ(4px)' }}>
            <img
              src="/images/linkedin-post.jpg"
              alt="LinkedIn post"
              className="w-full"
              style={{ borderRadius: 8, maxHeight: 160, objectFit: 'cover' }}
            />
          </div>

          {/* Engagement */}
          <div className="flex items-center gap-4 pb-1" style={{ color: '#9CA3AF' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <div className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="text-[11px]">{post.commentCount}</span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </div>

          {/* Caption */}
          <div>
            <p className="text-[11px] text-[#374151] leading-[1.4]" style={{ whiteSpace: 'pre-line' }}>
              {display}
              {post.postText.length > 140 && <span className="text-[#6B7280] ml-0.5">more</span>}
            </p>
            {tags.length > 0 && (
              <p className="text-[10px] text-[#2563EB] mt-1">{tags.join(' ')}</p>
            )}
          </div>
        </a>

        {/* 3D floating shadow */}
        <div
          className="absolute inset-x-3 -bottom-2 h-4 rounded-full -z-10"
          style={{
            background: 'rgba(10,102,194,0.15)',
            filter: 'blur(8px)',
            transform: 'translateZ(-10px)',
          }}
        />
      </motion.div>
    </motion.div>
  )
}
