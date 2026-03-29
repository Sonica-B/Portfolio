'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const certificates = [
  // Persistent Systems Awards
  { src: '/images/Certificates/REQ-084067_46402.png', title: 'Bravo Individual Award', desc: 'Persistent Systems — Process & Technology Excellence' },
  { src: '/images/Certificates/REQ-087550_46402.png', title: 'Bravo Team Award', desc: 'Persistent Systems — Teamwork & Dedication' },
  // HackerRank Certifications
  { src: '/images/Certificates/HackerRank-Python(Basic).png', title: 'Python (Basic) Certificate', desc: 'HackerRank — Nov 2020' },
  { src: '/images/Certificates/HackerRank-Java(Basic).png', title: 'Java (Basic) Certificate', desc: 'HackerRank — Nov 2020' },
  { src: '/images/Certificates/HackerRank-ProblemSolving(Basic).png', title: 'Problem Solving (Basic) Certificate', desc: 'HackerRank — Nov 2020' },
  // App Development
  { src: '/images/Certificates/App.png', title: 'App Development for Beginners', desc: 'JigsawMindz — Mar 2021' },
  // PDF-based certificates (shown as titled cards with icons)
  { title: 'Graduate Engineers with Multidimensional Skills', desc: 'Persistent Systems — Training Program', isPdf: true },
  { title: 'Azure Machine Learning — Basic Concepts', desc: 'LinkedIn Learning — Certificate of Completion', isPdf: true },
  { title: 'Learning Python', desc: 'LinkedIn Learning — Certificate of Completion', isPdf: true },
  { title: 'Python Object-Oriented Programming', desc: 'LinkedIn Learning — Certificate of Completion', isPdf: true },
  { title: 'Supervised Learning Essential Training', desc: 'LinkedIn Learning — Certificate of Completion', isPdf: true },
  { title: 'IoT & Cyber Security', desc: 'Coursera — Online Certification', isPdf: true },
  { title: 'Introduction to Virtual Reality', desc: 'Coursera — Online Certification', isPdf: true },
  { title: 'Microsoft Certified Professional', desc: 'Microsoft — Technical Certification', isPdf: true },
  { title: 'C Programming Certificate', desc: 'Technical Certification', isPdf: true },
  { title: 'Python Programming', desc: 'Skill Assessment Certificate', isPdf: true },
  { title: 'Web Design Course', desc: 'Skill Assessment Certificate', isPdf: true },
  { title: 'FUEL Aptitude Championship', desc: 'National Level Competition', isPdf: true },
  { title: 'Web Development Training', desc: 'Certificate of Completion', isPdf: true },
  { title: 'National Level Technical Competition', desc: 'Participant Certificate', isPdf: true },
  { title: 'Data Structures Quiz', desc: 'Technical Assessment', isPdf: true },
  { title: 'Hired Certificate', desc: 'Persistent Systems — Onboarding', isPdf: true },
  { title: 'Participant Certificate', desc: 'Technical Event Participation', isPdf: true },
  { title: 'Deep Learning Specialization', desc: 'Coursera — Andrew Ng', isPdf: true },
  { title: 'Machine Learning Foundations', desc: 'Coursera — Online Certification', isPdf: true },
  { title: 'Professional Development', desc: 'Persistent Systems — Certificate', isPdf: true },
]

// Heap stacking
const heapRotations = [-8, -4, 0, 4, 7]
const heapOffsets = [
  { x: -15, y: 10 },
  { x: 8, y: -5 },
  { x: 0, y: 0 },
  { x: -10, y: 8 },
  { x: 12, y: -8 },
]

// PDF placeholder card
function PdfCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-center">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1" className="mb-3 opacity-60">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
      <p className="text-white text-xs sm:text-sm font-medium leading-tight mb-1">{title}</p>
      <p className="text-gray-500 text-[10px] sm:text-xs">{desc}</p>
    </div>
  )
}

export default function CertificateCarousel() {
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const getTransform = useCallback((index: number, active: number) => {
    const offset = index - active
    const absOffset = Math.abs(offset)
    return {
      x: offset * 300,
      y: absOffset * 30,
      rotate: offset * -6,
      scale: absOffset === 0 ? 1 : absOffset === 1 ? 0.88 : 0.75,
      opacity: absOffset > 2 ? 0 : absOffset === 2 ? 0.3 : absOffset === 1 ? 0.65 : 1,
      zIndex: 10 - absOffset,
    }
  }, [])

  // Keyboard + swipe navigation
  useEffect(() => {
    if (!expanded) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIndex(p => Math.min(p + 1, certificates.length - 1))
      else if (e.key === 'ArrowLeft') setActiveIndex(p => Math.max(p - 1, 0))
      else if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [expanded])

  const navigate = useCallback((dir: 1 | -1) => {
    setActiveIndex(p => Math.max(0, Math.min(certificates.length - 1, p + dir)))
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-10 sm:mb-14"
    >
      <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <path d="M3 9h18M9 21V9"/>
        </svg>
        Certificates
        <span className="text-xs font-normal text-gray-500 ml-1">({certificates.length})</span>
      </h3>

      <AnimatePresence mode="wait">
        {!expanded ? (
          /* ─── Stacked Card Heap ─── */
          <motion.div
            key="heap"
            className="flex justify-center cursor-pointer py-6 sm:py-10"
            onClick={() => { setExpanded(true); setActiveIndex(0) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative w-[260px] h-[180px] sm:w-[340px] sm:h-[230px]">
              {certificates.slice(0, 5).map((cert, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: heapRotations[i],
                    x: heapOffsets[i].x,
                    y: heapOffsets[i].y,
                  }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: heapOffsets[i].y - 6 }}
                  style={{ zIndex: i }}
                >
                  <div
                    className="w-full h-full rounded-xl overflow-hidden border border-white/10"
                    style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.4)' }}
                  >
                    {cert.isPdf ? (
                      <PdfCard title={cert.title} desc={cert.desc} />
                    ) : (
                      <img src={cert.src} alt={cert.title} loading="lazy" className="w-full h-full object-cover" />
                    )}
                  </div>
                </motion.div>
              ))}

              <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none" style={{ zIndex: 10 }}>
                <motion.span
                  className="text-[10px] sm:text-xs text-white/70 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to explore {certificates.length} certificates
                </motion.span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ─── Expanded Carousel ─── */
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative py-6 sm:py-8"
          >
            {/* Close */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-0 right-0 z-30 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Decorative arc */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" viewBox="0 0 1000 400" preserveAspectRatio="none">
              <path d="M0 350 Q500 50 1000 350" fill="none" stroke="white" strokeWidth="1"/>
            </svg>

            {/* Carousel */}
            <div
              className="relative flex justify-center items-center overflow-hidden"
              style={{ height: 320 }}
            >
              {/* Nav arrows */}
              <button
                onClick={() => navigate(-1)}
                disabled={activeIndex === 0}
                className="absolute left-2 sm:left-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/10 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button
                onClick={() => navigate(1)}
                disabled={activeIndex === certificates.length - 1}
                className="absolute right-2 sm:right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:bg-white/10 transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>

              {/* Cards */}
              <div className="relative w-full flex justify-center" style={{ perspective: 1200 }}>
                {certificates.map((cert, i) => {
                  const t = getTransform(i, activeIndex)
                  if (t.opacity === 0) return null
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
                      }}
                      transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                      style={{ zIndex: t.zIndex }}
                      onClick={() => setActiveIndex(i)}
                      whileHover={i !== activeIndex ? { scale: t.scale + 0.03 } : {}}
                    >
                      <div
                        className={`w-[260px] h-[180px] sm:w-[360px] sm:h-[250px] rounded-xl overflow-hidden border transition-all duration-300 ${
                          i === activeIndex ? 'border-primary/30' : 'border-white/10'
                        }`}
                        style={{
                          boxShadow: i === activeIndex
                            ? '0 12px 48px rgba(0,212,255,0.12), 0 4px 16px rgba(0,0,0,0.3)'
                            : '0 6px 24px rgba(0,0,0,0.4)',
                          cursor: i === activeIndex ? 'default' : 'pointer',
                        }}
                      >
                        {cert.isPdf ? (
                          <PdfCard title={cert.title} desc={cert.desc} />
                        ) : (
                          <img src={cert.src} alt={cert.title} loading="lazy" className="w-full h-full object-cover" draggable={false} />
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Info + dots */}
            <div className="text-center mt-4 sm:mt-6">
              <motion.div key={activeIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
                <p className="text-sm sm:text-base font-medium text-white">{certificates[activeIndex].title}</p>
                <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">{certificates[activeIndex].desc}</p>
              </motion.div>

              {/* Progress bar instead of dots (too many for dots) */}
              <div className="flex justify-center items-center gap-3">
                <span className="text-[10px] text-gray-600">{activeIndex + 1}/{certificates.length}</span>
                <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${((activeIndex + 1) / certificates.length) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-white/20 mt-2">Use arrow keys or click arrows to navigate</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
