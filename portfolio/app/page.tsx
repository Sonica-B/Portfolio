'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import LandingPage from '@/components/LandingPage'
import BottomNav from '@/components/BottomNav'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ExperienceSection from '@/components/sections/ExperienceSection'
import SkillsSection from '@/components/sections/SkillsSection'
import AboutSection from '@/components/sections/AboutSection'
import ChatBot from '@/components/ChatBot'

const Scene3D = dynamic(() => import('@/components/Scene3D'), {
  ssr: false,
  loading: () => <div className="ambient-bg" />
})

export type ActiveSection = 'home' | 'projects' | 'experience' | 'skills' | 'about'

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home')

  const renderSection = () => {
    switch (activeSection) {
      case 'projects':
        return <ProjectsSection onBack={() => setActiveSection('home')} />
      case 'experience':
        return <ExperienceSection onBack={() => setActiveSection('home')} />
      case 'skills':
        return <SkillsSection onBack={() => setActiveSection('home')} />
      case 'about':
        return <AboutSection onBack={() => setActiveSection('home')} />
      default:
        return <LandingPage onNavigate={setActiveSection} />
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
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

      <Scene3D />
      <div className="ambient-bg" />

      <AnimatePresence mode="wait">
        {renderSection()}
      </AnimatePresence>

      <BottomNav
        activeSection={activeSection}
        onNavigate={setActiveSection}
        isVisible={activeSection !== 'home'}
      />

      <ChatBot />
    </main>
  )
}
