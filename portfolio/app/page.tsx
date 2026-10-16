import { Hero } from '@/components/hero/hero'
import { ProofStrip } from '@/components/hero/proof-strip'
import { PitchReel } from '@/components/reel/pitch-reel'
import { PITCH_SLUGS } from '@/components/reel/pitch-slugs'
import {
  ActivitySection,
  ColleaguesSection,
  ContactSection,
  ExperienceLedger,
  FeaturedWork,
  NowSection,
  RecognitionSection,
  ResearchSection,
  SkillsSection,
  StatsLedger,
} from '@/components/sections'
import { JsonLd, profilePageJsonLd, reelItemListJsonLd } from '@/lib/jsonld'

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <JsonLd data={reelItemListJsonLd(PITCH_SLUGS)} />
      <Hero />
      <ProofStrip />
      <FeaturedWork />
      <PitchReel />
      <ResearchSection />
      <ExperienceLedger />
      <StatsLedger />
      <NowSection />
      <SkillsSection />
      <RecognitionSection />
      <ActivitySection />
      <ColleaguesSection />
      <ContactSection />
    </>
  )
}
