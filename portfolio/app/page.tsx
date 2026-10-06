import { Hero } from '@/components/hero/hero'
import { ProofStrip } from '@/components/hero/proof-strip'
import { JsonLd, profilePageJsonLd } from '@/lib/jsonld'

export default function HomePage() {
  return (
    <>
      <JsonLd data={profilePageJsonLd()} />
      <Hero />
      <ProofStrip />
    </>
  )
}
