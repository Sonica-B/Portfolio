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
