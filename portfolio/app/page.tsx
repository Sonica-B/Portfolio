'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import LandingPage from '@/components/LandingPage'
import BottomNav from '@/components/BottomNav'
import ErrorBoundary from '@/components/ErrorBoundary'

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <div className="ambient-bg" />
})

const SectionSkeleton = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
  </div>
)

const ExperienceSection = dynamic(() => import('@/components/sections/ExperienceSection'), {
  loading: () => <SectionSkeleton />,
})
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), {
  loading: () => <SectionSkeleton />,
})
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'), {
  loading: () => <SectionSkeleton />,
})
const AchievementsSection = dynamic(() => import('@/components/sections/AchievementsSection'), {
  loading: () => <SectionSkeleton />,
})
const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
  loading: () => <SectionSkeleton />,
})
const Footer = dynamic(() => import('@/components/Footer'))

export type ActiveSection = 'home' | 'projects' | 'experience' | 'skills' | 'achievements' | 'about'

const SECTION_ORDER: ActiveSection[] = ['home', 'experience', 'projects', 'skills', 'achievements', 'about']

export default function Home() {
  const [visibleSection, setVisibleSection] = useState<ActiveSection>('home')
  const scrollProgressRef = useRef(0)

  // Bridge DOM scroll to R3F via mutable ref (no re-renders)
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgressRef.current = docHeight > 0 ? scrollY / docHeight : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    experience: useRef<HTMLElement>(null),
    projects: useRef<HTMLElement>(null),
    skills: useRef<HTMLElement>(null),
    achievements: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
  }

  const scrollToSection = useCallback((section: ActiveSection) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  // IntersectionObserver to track visible section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id as ActiveSection)
          }
        })
      },
      { rootMargin: '-30% 0px -30% 0px', threshold: 0 }
    )

    SECTION_ORDER.forEach((id) => {
      const ref = sectionRefs[id]
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative">
      {/* SEO: Crawlable semantic content (visually hidden, readable by search engines) */}
      <article className="sr-only" aria-hidden="false">
        <header>
          <h1>Shreya Boyane - AI/ML Engineer</h1>
          <p>
            Shreya Boyane is an AI/ML Engineer specializing in production-grade
            Agentic AI workflows, LLM systems, and Computer Vision solutions.
            Currently pursuing a Master of Science in Artificial Intelligence at
            Worcester Polytechnic Institute (WPI) in Worcester, Massachusetts.
          </p>
        </header>
        <section>
          <h2>Expertise</h2>
          <ul>
            <li>Agentic AI Workflows &amp; Multi-Agent Systems</li>
            <li>Large Language Models (LLMs) &amp; Natural Language Processing</li>
            <li>Computer Vision &amp; Deep Learning</li>
            <li>Brain-Computer Interfaces (BCI)</li>
            <li>Python, PyTorch, TensorFlow</li>
            <li>MLOps &amp; Production ML Systems</li>
          </ul>
        </section>
        <section>
          <h2>Education</h2>
          <p>MS in Artificial Intelligence - Worcester Polytechnic Institute (WPI)</p>
        </section>
        <section>
          <h2>Contact</h2>
          <address>
            <a href="mailto:shreyaa.boyane@gmail.com">shreyaa.boyane@gmail.com</a>
            {' | '}
            <a href="https://linkedin.com/in/shreya-boyane" rel="me">LinkedIn</a>
            {' | '}
            <a href="https://github.com/Sonica-B" rel="me">GitHub</a>
          </address>
        </section>
      </article>

      <ErrorBoundary>
        <Scene3D scrollProgressRef={scrollProgressRef} />
      </ErrorBoundary>
      <div className="ambient-bg" />

      {/* All sections stacked vertically for continuous scroll */}
      <section ref={sectionRefs.home} id="home" className="relative z-10">
        <LandingPage onNavigate={scrollToSection} />
      </section>

      <section ref={sectionRefs.experience} id="experience" className="relative z-[5]">
        <ExperienceSection />
      </section>

      <section ref={sectionRefs.projects} id="projects" className="relative">
        <ProjectsSection />
      </section>

      <section ref={sectionRefs.skills} id="skills" className="relative">
        <SkillsSection />
      </section>

      <section ref={sectionRefs.achievements} id="achievements" className="relative">
        <AchievementsSection />
      </section>

      <section ref={sectionRefs.about} id="about" className="relative">
        <AboutSection />
      </section>

      <Footer />

      <BottomNav
        activeSection={visibleSection}
        onNavigate={scrollToSection}
        isVisible={visibleSection !== 'home'}
      />
    </main>
  )
}
