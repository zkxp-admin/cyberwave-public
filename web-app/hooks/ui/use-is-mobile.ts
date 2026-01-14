'use client'

import { useMediaQuery } from '@mantine/hooks'
import { useMemo } from 'react'

export function useIsMobile() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return useMemo(() => isMobile, [isMobile])
}
