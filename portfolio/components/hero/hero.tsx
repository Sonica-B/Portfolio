import { profile } from '@/lib/content'
import { ButtonLink } from '@/components/ui/button'
import { TextEffect } from '@/components/motion-primitives/text-effect'
import { DepthPortrait } from '@/components/hero/depth-portrait'

export function Hero() {
  const { links } = profile
  return (
    <section
      aria-labelledby="hero-title"
      className="container-site grid items-center gap-10 pt-10 pb-6 md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:gap-8 md:py-12"
    >
      <div className="md:col-span-7">
        <h1 id="hero-title" className="text-display">
          Shreya Boyane
          <span className="mt-2 block text-ink-2">Machine Learning Engineer</span>
        </h1>
        <TextEffect as="p" per="word" preset="fade-in-blur" delay={0.15} speedReveal={1.4} className="text-lead mt-6 max-w-[46ch] text-ink-2">
          I take models from training infrastructure to optimized inference and keep them reliable in production. M.S. in AI, WPI 2026.
        </TextEffect>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={links.resumePdf} download>
            Download resume
          </ButtonLink>
          <ButtonLink href={links.email} variant="secondary">
            Email me
          </ButtonLink>
        </div>
      </div>
      <div className="md:col-span-5">
        <DepthPortrait
          src="/portrait/shreya-1000.webp"
          depthSrc="/portrait/shreya-depth.png"
          width={568}
          height={1000}
          alt="Shreya Boyane standing with arms crossed in a navy blazer"
        />
      </div>
    </section>
  )
}
