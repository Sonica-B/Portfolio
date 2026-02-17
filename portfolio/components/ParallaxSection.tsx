'use client'

import { ReactNode, useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function ParallaxSection({
  children,
  speed = 0,
  className = '',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Reduce parallax on mobile for performance
  const effectiveSpeed = isMobile ? speed * 0.3 : speed
  const y = useTransform(scrollYProgress, [0, 1], [effectiveSpeed * 100, -effectiveSpeed * 100])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
