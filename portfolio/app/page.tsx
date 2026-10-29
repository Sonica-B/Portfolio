import { Hero } from '@/components/hero/hero'
import { ProofStrip } from '@/components/hero/proof-strip'
import {
  ActivitySection,
  ContactSection,
  ExperienceLedger,
  FeaturedWork,
  OpenSourceSection,
  RecognitionSection,
  ResearchSection,
  SkillsSection,
} from '@/components/sections'
import { JsonLd, profilePageJsonLd } from '@/lib/jsonld'

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <Hero />
      <ProofStrip />
      <FeaturedWork />
      <ResearchSection />
      <ExperienceLedger />
      <OpenSourceSection />
      <SkillsSection />
      <RecognitionSection />
      <ActivitySection />
      <ContactSection />
    </>
  )
}
