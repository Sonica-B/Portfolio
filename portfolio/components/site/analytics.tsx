import Script from 'next/script'

// Read at build time (NEXT_PUBLIC_*), so an unset variable renders nothing and ships no script.
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
const UMAMI_SRC = process.env.NEXT_PUBLIC_UMAMI_SRC
const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

/**
 * Optional privacy-first analytics beside Vercel Analytics. Plausible mounts when
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set; Umami when NEXT_PUBLIC_UMAMI_SRC and
 * NEXT_PUBLIC_UMAMI_WEBSITE_ID are both set. lib/analytics.ts forwards track() calls
 * to whichever script is present. Server component, deferred until after hydration.
 */
export function SiteAnalytics() {
  return (
    <>
      {PLAUSIBLE_DOMAIN ? (
        <Script src="https://plausible.io/js/script.js" data-domain={PLAUSIBLE_DOMAIN} strategy="afterInteractive" />
      ) : null}
      {UMAMI_SRC && UMAMI_WEBSITE_ID ? (
        <Script src={UMAMI_SRC} data-website-id={UMAMI_WEBSITE_ID} strategy="afterInteractive" />
      ) : null}
    </>
  )
}
