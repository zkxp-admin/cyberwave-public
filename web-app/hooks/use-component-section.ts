'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useMemo, useCallback, useEffect, useRef } from 'react'
import {
  COMPONENT_REGISTRY,
  getComponentById,
  type ComponentSection,
} from '@/components/component-registry'

const DEFAULT_SECTION = COMPONENT_REGISTRY[0]?.id as ComponentSection

/**
 * Custom hook for managing component section state via URL search params.
 * Follows Next.js best practices for client-side navigation.
 */
export function useComponentSection() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const hasInitialized = useRef(false)

  const activeSection = useMemo(() => {
    const sectionParam = searchParams.get('section')
    if (!sectionParam) return DEFAULT_SECTION

    const component = getComponentById(sectionParam)
    return component ? (sectionParam as ComponentSection) : DEFAULT_SECTION
  }, [searchParams])

  const setActiveSection = useCallback(
    (section: ComponentSection) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('section', section)
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [searchParams, router]
  )

  // Set default section in URL on mount if missing
  useEffect(() => {
    if (!hasInitialized.current && !searchParams.get('section')) {
      hasInitialized.current = true
      const params = new URLSearchParams()
      params.set('section', DEFAULT_SECTION)
      router.replace(`?${params.toString()}`, { scroll: false })
    }
  }, [searchParams, router])

  return { activeSection, setActiveSection }
}
