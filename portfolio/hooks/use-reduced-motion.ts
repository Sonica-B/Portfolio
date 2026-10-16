'use client'

import { useSyncExternalStore } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(QUERY).matches
const getServerSnapshot = () => null

/**
 * The visitor's prefers-reduced-motion setting, without loading the motion library: null on the
 * server and during hydration, then true or false, and it follows changes to the OS setting.
 * Same contract as useReducedMotion from motion/react, so callers test `=== true` or `=== false`.
 */
export function useReducedMotion(): boolean | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
