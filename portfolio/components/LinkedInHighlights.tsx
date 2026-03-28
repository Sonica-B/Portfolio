'use client'

import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'

const EMBED_URL = 'https://www.linkedin.com/embed/feed/update/urn:li:share:7422436984255598592?collapsed=1'
const POST_URL = 'https://www.linkedin.com/feed/update/urn:li:share:7422436984255598592'

function LinkedInIcon({ size = 18, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#0A66C2" opacity={opacity} aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  )
}

function StaticCard() {
  return (
    <a
      href={POST_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '14px',
        padding: '14px 16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <LinkedInIcon size={20} />
        <span className="text-[10px] text-white/40 uppercase tracking-wider">Latest Post</span>
      </div>
      <p className="text-sm text-white/90 font-medium group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
        Data Science GQP MVP Award
      </p>
      <p className="text-[11px] text-white/40 mt-1.5 line-clamp-2 leading-relaxed">
        In Dec 2025, I received the Data Science GQP MVP award for our project on immigration document validation...
      </p>
      <div className="flex items-center mt-2.5">
        <span className="text-[10px] text-white/30 group-hover:text-cyan-400/60 transition-colors">
          Read on LinkedIn
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className="ml-1 text-white/20 group-hover:text-cyan-400 transition-colors duration-300">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </div>
    </a>
  )
}

export default function LinkedInHighlights() {
  const [showFallback, setShowFallback] = useState(false)
  const [iframeVisible, setIframeVisible] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleLoad = useCallback(() => {
    // After iframe fires onLoad, check if it actually rendered content.
    // Chrome's Tracking Protection can block third-party iframe content
    // silently — onLoad fires but the iframe renders at 0x0.
    setTimeout(() => {
      const el = iframeRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.width > 0 && rect.height > 0) {
          setIframeVisible(true)
        } else {
          setShowFallback(true)
        }
      }
    }, 1500)
  }, [])

  const handleError = useCallback(() => setShowFallback(true), [])

  if (showFallback) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
        className="mt-4 sm:mt-5 block max-w-md w-full"
      >
        <StaticCard />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.3 }}
      className="mt-4 sm:mt-5 block w-full"
      style={{ maxWidth: 504 }}
    >
      {/* LinkedIn icon + label */}
      <div className="flex items-center gap-2 mb-2">
        <LinkedInIcon />
        <p className="text-[10px] text-white/40 uppercase tracking-wider">Latest Post</p>
      </div>

      {/* Iframe embed with loading skeleton */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.03)',
          maxWidth: 504,
          height: 668,
        }}
      >
        {/* Loading skeleton */}
        {!iframeVisible && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 animate-pulse z-10">
            <LinkedInIcon size={32} opacity={0.4} />
            <span className="text-xs text-white/30">Loading post...</span>
          </div>
        )}

        {/* LinkedIn official embed iframe */}
        <iframe
          ref={iframeRef}
          src={EMBED_URL}
          height={668}
          width={504}
          frameBorder={0}
          allowFullScreen
          title="Embedded post"
          onLoad={handleLoad}
          onError={handleError}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: 504,
            height: 668,
            border: 'none',
            borderRadius: '12px',
            opacity: iframeVisible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>
    </motion.div>
  )
}
