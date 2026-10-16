/**
 * Deferred work for code the first screen does not need (the command palette, the scroll island,
 * the hero point cloud). `afterPaintIdle(cb)` waits until the first contentful paint has been
 * presented, then for an idle period (or `timeout` ms at most), so nothing it loads competes with
 * the first render. On a client-side navigation the paint already happened and only the idle wait applies.
 * Returns a cancel function. Client only.
 */

let painted: Promise<void> | null = null

/** Resolves once a first-contentful-paint entry exists (or after a safety timeout where paint timing is missing). */
function firstPaint(): Promise<void> {
  if (painted) return painted
  painted = new Promise<void>((resolve) => {
    const isFcp = (e: PerformanceEntry) => e.name === 'first-contentful-paint'
    try {
      if (performance.getEntriesByType('paint').some(isFcp)) {
        resolve()
        return
      }
      const po = new PerformanceObserver((list) => {
        if (list.getEntries().some(isFcp)) {
          po.disconnect()
          resolve()
        }
      })
      po.observe({ type: 'paint', buffered: true })
    } catch {
      // No paint timing: fall through to the timer.
    }
    // Paint timing is absent in some engines, and a hidden tab never paints.
    window.setTimeout(resolve, 3000)
  })
  return painted
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

export function afterPaintIdle(cb: () => void, timeout = 2000): () => void {
  let cancelled = false
  let idleId: number | undefined
  let timerId: number | undefined
  const w = window as IdleWindow
  void firstPaint().then(() => {
    if (cancelled) return
    if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => !cancelled && cb(), { timeout })
    else timerId = window.setTimeout(() => !cancelled && cb(), 200)
  })
  return () => {
    cancelled = true
    if (idleId !== undefined) w.cancelIdleCallback?.(idleId)
    if (timerId !== undefined) window.clearTimeout(timerId)
  }
}
