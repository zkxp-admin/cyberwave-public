'use client'

import { useState, useEffect } from 'react'

function getPWADisplayMode(): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return 'unknown'
  }

  if (document.referrer.startsWith('android-app://'))
    return 'twa'
  if (window.matchMedia('(display-mode: browser)').matches)
    return 'browser'
  if (window.matchMedia('(display-mode: standalone)').matches)
    return 'standalone'
  if (window.matchMedia('(display-mode: minimal-ui)').matches)
    return 'minimal-ui'
  if (window.matchMedia('(display-mode: fullscreen)').matches)
    return 'fullscreen'
  if (window.matchMedia('(display-mode: window-controls-overlay)').matches)
    return 'window-controls-overlay'

  return 'unknown'
}

export function useDisplayMode(): string {
  const [displayMode, setDisplayMode] = useState<string>('unknown')

  useEffect(() => {
    const updateDisplayMode = () => {
      setDisplayMode(getPWADisplayMode())
    }

    updateDisplayMode()

    const mediaQueries = [
      '(display-mode: browser)',
      '(display-mode: standalone)',
      '(display-mode: minimal-ui)',
      '(display-mode: fullscreen)',
      '(display-mode: window-controls-overlay)'
    ]

    const mediaQueryLists = mediaQueries.map(query => window.matchMedia(query))
    mediaQueryLists.forEach(mql => mql.addEventListener('change', updateDisplayMode))

    return () => {
      mediaQueryLists.forEach(mql => mql.removeEventListener('change', updateDisplayMode))
    }
  }, [])

  return displayMode
}
