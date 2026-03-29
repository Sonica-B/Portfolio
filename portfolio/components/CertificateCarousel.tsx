'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'

const certificates = [
  { src: '/images/Certificates/REQ-084067_46402.png', title: 'Bravo Individual Award — Persistent Systems', desc: 'Process & Technology Excellence' },
  { src: '/images/Certificates/REQ-087550_46402.png', title: 'Bravo Team Award — Persistent Systems', desc: 'Teamwork & Dedication' },
  { src: '/images/Certificates/HackerRank-Python(Basic).png', title: 'HackerRank — Python (Basic)', desc: 'Nov 2020' },
  { src: '/images/Certificates/HackerRank-Java(Basic).png', title: 'HackerRank — Java (Basic)', desc: 'Nov 2020' },
  { src: '/images/Certificates/HackerRank-ProblemSolving(Basic).png', title: 'HackerRank — Problem Solving (Basic)', desc: 'Nov 2020' },
  { src: '/images/Certificates/App.png', title: 'App Development for Beginners — JigsawMindz', desc: 'Mar 2021' },
]

// Stacked heap rotations for the collapsed pile
const heapRotations = [-6, -3, 0, 3, 5, -4]
const heapOffsets = [
  { x: -12, y: 8 },
  { x: 6, y: -4 },
  { x: 0, y: 0 },
  { x: -8, y: 6 },
  { x: 10, y: -6 },
  { x: -4, y: 4 },
]

export default function CertificateCarousel() {
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const dragRef = useRef<HTMLDivElement>(null)
  const dragX = useMotionValue(0)
  const springX = useSpring(dragX, { stiffness: 300, damping: 30 })

  // Arc curve for carousel positioning
  const getCarouselTransform = useCallback((index: number, active: number) => {
    const offset = index - active
    const absOffset = Math.abs(offset)
    const x = offset * 320
    const y = absOffset * 40
    const rotate = offset * -8
    const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.85 : 0.7
    const z = absOffset === 0 ? 10 : -absOffset * 10
    const opacity = absOffset > 2 ? 0 : absOffset === 2 ? 0.4 : absOffset === 1 ? 0.7 : 1
    return { x, y, rotate, scale, z, opacity }
  }, [])

  const handleDragEnd = useCallback((_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 80
    const velocity = info.velocity.x
    if (info.offset.x < -threshold || velocity < -500) {
      setActiveIndex(prev => Math.min(prev + 1, certificates.length - 1))
    } else if (info.offset.x > threshold || velocity > 500) {
      setActiveIndex(prev => Math.max(prev - 1, 0))
    }
    dragX.set(0)
  }, [dragX])

  // Keyboard navigation
  useEffect(() => {
    if (!expanded) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIndex(prev => Math.min(prev + 1, certificates.length - 1))
      else if (e.key === 'ArrowLeft') setActiveIndex(prev => Math.max(prev - 1, 0))
      else if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [expanded])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-6 sm:mb-8"
    >
      <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
        Certificates
      </h3>

      <AnimatePresence mode="wait">
        {!expanded ? (
          /* ─── Stacked Card Heap ─── */
          <motion.div
            key="heap"
            className="flex justify-center cursor-pointer py-8"
            onClick={() => setExpanded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-[280px] h-[200px] sm:w-[340px] sm:h-[240px]">
              {certificates.slice(0, 5).map((cert, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: heapRotations[i],
                    x: heapOffsets[i].x,
                    y: heapOffsets[i].y,
                  }}
                  transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: heapOffsets[i].y - 8, scale: 1.02 }}
                  style={{ zIndex: i }}
                >
                  <div
                    className="w-full h-full rounded-xl overflow-hidden border border-white/10"
                    style={{
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)',
                    }}
                  >
                    <img
                      src={cert.src}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}

              {/* "Click to explore" overlay on top card */}
              <div
                className="absolute inset-0 flex items-end justify-center pb-3 z-10 pointer-events-none"
                style={{ zIndex: 10 }}
              >
                <motion.span
                  className="text-[10px] sm:text-xs text-white/60 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to explore {certificates.length} certificates
                </motion.span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ─── Expanded Draggable Carousel ─── */
          <motion.div
            key="carousel"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative py-8 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-2 right-2 z-30 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Arc path hint (decorative) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
              viewBox="0 0 1000 400"
              preserveAspectRatio="none"
            >
              <path
                d="M0 350 Q500 50 1000 350"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </svg>

            {/* Draggable carousel area */}
            <motion.div
              ref={dragRef}
              className="relative flex justify-center items-center cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              style={{ x: springX, height: 360, touchAction: 'pan-y' }}
            >
              <div className="relative w-full flex justify-center" style={{ perspective: 1200 }}>
                {certificates.map((cert, i) => {
                  const t = getCarouselTransform(i, activeIndex)
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      animate={{
                        x: t.x,
                        y: t.y,
                        rotate: t.rotate,
                        scale: t.scale,
                        opacity: t.opacity,
                        zIndex: 10 - Math.abs(i - activeIndex),
                      }}
                      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                      onClick={() => setActiveIndex(i)}
                      style={{ cursor: i === activeIndex ? 'default' : 'pointer' }}
                    >
                      <div
                        className={`w-[280px] h-[200px] sm:w-[380px] sm:h-[270px] rounded-xl overflow-hidden border transition-all duration-300 ${
                          i === activeIndex ? 'border-primary/30' : 'border-white/10'
                        }`}
                        style={{
                          boxShadow: i === activeIndex
                            ? '0 12px 48px rgba(0,212,255,0.15), 0 4px 16px rgba(0,0,0,0.3)'
                            : '0 8px 32px rgba(0,0,0,0.4)',
                        }}
                      >
                        <img
                          src={cert.src}
                          alt={cert.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Title + dots */}
            <div className="text-center mt-4">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3"
              >
                <p className="text-sm sm:text-base font-medium text-white">
                  {certificates[activeIndex].title}
                </p>
                {certificates[activeIndex].desc && (
                  <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
                    {certificates[activeIndex].desc}
                  </p>
                )}
              </motion.div>

              {/* Dot indicators */}
              <div className="flex justify-center gap-1.5">
                {certificates.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? 'bg-primary w-5' : 'bg-white/20 w-1.5 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <p className="text-[10px] text-white/30 mt-2">
                Drag or use arrow keys to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
