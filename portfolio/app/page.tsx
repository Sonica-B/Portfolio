'use client'

import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import ChatBot from '@/components/ChatBot'

// Dynamic import for Three.js component (client-side only)
const NeuralNetwork = dynamic(() => import('@/components/NeuralNetwork'), {
  ssr: false,
  loading: () => <div className="neural-canvas bg-background" />
})

export default function Home() {
  return (
    <main className="relative">
      <NeuralNetwork />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <ChatBot />
    </main>
  )
}
