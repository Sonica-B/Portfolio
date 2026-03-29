'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, PanInfo } from 'framer-motion'

const certificates = [
  // Corporate Awards
  { src: '/images/certs/Shreya_Boyane.png', title: 'Top Talent 2024', desc: 'Persistent Systems' },
  { src: '/images/certs/REQ-084067_46402.png', title: 'Bravo Individual Award', desc: 'Persistent Systems — Process & Technology Excellence' },
  { src: '/images/certs/REQ-087550_46402.png', title: 'Bravo Team Award', desc: 'Persistent Systems — Teamwork & Dedication' },
  { src: '/images/certs/046402_Graduate_Engineers_with_Multidimensional_Skills.png', title: 'GEMS Training Program', desc: 'Persistent Systems — FY2023' },
  // AI & ML
  { src: '/images/certs/Coursera_B8N3LBXEWHSM.png', title: 'AI For Everyone', desc: 'DeepLearning.AI — Coursera, May 2021' },
  { src: '/images/certs/CertificateOfCompletion_Azure_Machine_Learning_Development_1.png', title: 'Azure Machine Learning — Basic Concepts', desc: 'LinkedIn Learning' },
  { src: '/images/certs/CertificateOfCompletion_Supervised_Learning_Essential_Traini.png', title: 'Supervised Learning Essential Training', desc: 'LinkedIn Learning' },
  { src: '/images/certs/MicrosoftCertificate.png', title: 'Microsoft AI Classroom Series', desc: 'Microsoft x NASSCOM — Mar 2021' },
  // Programming
  { src: '/images/certs/HackerRank-Python_Basic_.png', title: 'Python (Basic) Certificate', desc: 'HackerRank — Nov 2020' },
  { src: '/images/certs/HackerRank-Java_Basic_.png', title: 'Java (Basic) Certificate', desc: 'HackerRank — Nov 2020' },
  { src: '/images/certs/HackerRank-ProblemSolving_Basic_.png', title: 'Problem Solving (Basic)', desc: 'HackerRank — Nov 2020' },
  { src: '/images/certs/CertificateOfCompletion_Learning_Python__1_.png', title: 'Learning Python', desc: 'LinkedIn Learning' },
  { src: '/images/certs/CertificateOfCompletion_Python_ObjectOriented_Programming.png', title: 'Python OOP', desc: 'LinkedIn Learning' },
  { src: '/images/certs/Certificate_for_Shreya_Boyane_for__Python_Programming_.png', title: 'Python Programming', desc: 'Skill Assessment Certificate' },
  { src: '/images/certs/C_Lang_Shreya_Certificate.png', title: 'C Programming', desc: 'Technical Certification' },
  { src: '/images/certs/SHREYA-BOYANE-Participant-Certificate.png', title: 'C Training Completion', desc: 'IIT Bombay — Spoken Tutorial, Sep 2019' },
  // Web & IoT
  { src: '/images/certs/Web_Development_Training_-_Certificate_of_Completion__1_.png', title: 'Web Development Training', desc: 'Internshala — Aug–Sep 2018' },
  { src: '/images/certs/Certificate_for_Shreya_Boyane_for__Test_for_Web_Design_Cours.png', title: 'Web Design Course', desc: 'Skill Assessment' },
  { src: '/images/certs/Coursera_Z9CRVXVGS2MG.png', title: 'Cybersecurity and IoT', desc: 'Kennesaw State University — Coursera, Nov 2020' },
  { src: '/images/certs/Intriduction-to-Virtual-Reality.png', title: 'Introduction to Virtual Reality', desc: 'Coursera' },
  // Competitions & Other
  { src: '/images/certs/App.png', title: 'App Development for Beginners', desc: 'JigsawMindz — Mar 2021' },
  { src: '/images/certs/Shreya_Boyane_Hired_Certificate.png', title: 'Web Dev Internship Selection', desc: 'Internshala — Flavalon IT, Mar 2021' },
  { src: '/images/certs/Certificate_for_Shreya_Boyane_for__FUEL_Aptitude_Championshi.png', title: 'FUEL Aptitude Championship', desc: 'National Level Competition' },
  { src: '/images/certs/National_Level_Technical_Co____.png', title: 'National Web Design Contest', desc: 'Computer Society of India x TechGig, May 2020' },
  { src: '/images/certs/Quiz_On_Data_Structure_usin___.png', title: 'Data Structures Quiz', desc: 'Technical Assessment' },
]

const heapRotations = [-8, -4, 0, 4, 7]
const heapOffsets = [
  { x: -15, y: 10 }, { x: 8, y: -5 }, { x: 0, y: 0 }, { x: -10, y: 8 }, { x: 12, y: -8 },
]

export default function CertificateCarousel() {
  const [expanded, setExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const dragX = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Drag handler — smooth slide
  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 60
    const vel = info.velocity.x
    if (info.offset.x < -threshold || vel < -400) {
      setActiveIndex(p => Math.min(p + 1, certificates.length - 1))
    } else if (info.offset.x > threshold || vel > 400) {
      setActiveIndex(p => Math.max(p - 1, 0))
    }
  }, [])

  // Keyboard
  useEffect(() => {
    if (!expanded) return
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setActiveIndex(p => Math.min(p + 1, certificates.length - 1))
      else if (e.key === 'ArrowLeft') setActiveIndex(p => Math.max(p - 1, 0))
      else if (e.key === 'Escape') setExpanded(false)
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [expanded])

  // Arc transform — matches the reference "Wanderer" carousel
  const getArcTransform = useCallback((i: number, active: number) => {
    const offset = i - active
    const abs = Math.abs(offset)
    return {
      x: offset * 380,             // horizontal spread
      y: abs * abs * 15,           // parabolic arc (quadratic curve)
      rotate: offset * -10,        // tilt along arc
      scale: abs === 0 ? 1 : abs === 1 ? 0.82 : 0.65,
      opacity: abs > 2 ? 0 : abs === 2 ? 0.35 : abs === 1 ? 0.7 : 1,
      zIndex: 20 - abs,
    }
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
          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
        </svg>
        Certificates
        <span className="text-xs font-normal text-gray-500 ml-1">({certificates.length})</span>
      </h3>

      <AnimatePresence mode="wait">
        {!expanded ? (
          /* ─── Stacked Heap ─── */
          <motion.div
            key="heap"
            className="flex justify-center cursor-pointer py-8 sm:py-12"
            onClick={() => { setExpanded(true); setActiveIndex(0) }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="relative w-[300px] h-[210px] sm:w-[400px] sm:h-[280px]">
              {certificates.slice(0, 5).map((cert, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: heapRotations[i], x: heapOffsets[i].x, y: heapOffsets[i].y }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{ y: heapOffsets[i].y - 8 }}
                  style={{ zIndex: i }}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                    <img src={cert.src} alt={cert.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
              <div className="absolute inset-0 flex items-end justify-center pb-3 pointer-events-none" style={{ zIndex: 10 }}>
                <motion.span
                  className="text-[10px] sm:text-xs text-white/70 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to explore {certificates.length} certificates
                </motion.span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ─── Draggable Arc Carousel ─── */
          <motion.div
            key="carousel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative py-4 sm:py-8"
          >
            {/* Close */}
            <button
              onClick={() => setExpanded(false)}
              className="absolute top-0 right-0 z-30 w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Decorative arc */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" viewBox="0 0 1200 500" preserveAspectRatio="none">
              <path d="M-100 450 Q600 50 1300 450" fill="none" stroke="white" strokeWidth="1.5"/>
            </svg>

            {/* Drag surface */}
            <motion.div
              ref={containerRef}
              className="relative flex justify-center items-center cursor-grab active:cursor-grabbing overflow-visible"
              style={{ height: 420 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              <div className="relative w-full flex justify-center">
                {certificates.map((cert, i) => {
                  const t = getArcTransform(i, activeIndex)
                  if (t.opacity === 0) return null
                  return (
                    <motion.div
                      key={i}
                      className="absolute"
                      animate={{
                        x: t.x, y: t.y, rotate: t.rotate,
                        scale: t.scale, opacity: t.opacity,
                      }}
                      transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                      style={{ zIndex: t.zIndex }}
                      onClick={() => i !== activeIndex && setActiveIndex(i)}
                    >
                      <div
                        className={`w-[320px] h-[220px] sm:w-[480px] sm:h-[340px] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                          i === activeIndex ? 'border-white/20' : 'border-white/5'
                        }`}
                        style={{
                          boxShadow: i === activeIndex
                            ? '0 16px 64px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)'
                            : '0 8px 32px rgba(0,0,0,0.4)',
                          cursor: i === activeIndex ? 'grab' : 'pointer',
                        }}
                      >
                        <img
                          src={cert.src}
                          alt={cert.title}
                          loading="lazy"
                          className="w-full h-full object-cover pointer-events-none select-none"
                          draggable={false}
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            {/* Title + progress */}
            <div className="text-center mt-2 sm:mt-4">
              <motion.div key={activeIndex} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
                <p className="text-base sm:text-lg font-semibold text-white">{certificates[activeIndex].title}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{certificates[activeIndex].desc}</p>
              </motion.div>

              <div className="flex justify-center items-center gap-3">
                <span className="text-[10px] text-gray-600 tabular-nums">{activeIndex + 1} / {certificates.length}</span>
                <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{ width: `${((activeIndex + 1) / certificates.length) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-white/20 mt-2">Drag to navigate</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
