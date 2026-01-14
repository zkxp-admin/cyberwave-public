'use client'

import { useEffect, useState } from 'react'

export interface NetworkStatus {
  isOnline: boolean
  connectionType: string | null
  effectiveType: string | null
  downlink: number | null
  rtt: number | null
  saveData: boolean | null
}

export function useNetworkStatus() {
  const [status, setStatus] = useState<NetworkStatus>({
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    connectionType: null,
    effectiveType: null,
    downlink: null,
    rtt: null,
    saveData: null,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateStatus = () => {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection

      setStatus({
        isOnline: navigator.onLine,
        connectionType: connection?.type || null,
        effectiveType: connection?.effectiveType || null,
        downlink: connection?.downlink || null,
        rtt: connection?.rtt || null,
        saveData: connection?.saveData || null,
      })
    }

    // Initial update
    updateStatus()

    // Listen for online/offline events
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)

    // Listen for connection changes (if supported)
    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection

    if (connection) {
      connection.addEventListener('change', updateStatus)
    }

    return () => {
      window.removeEventListener('online', updateStatus)
      window.removeEventListener('offline', updateStatus)
      if (connection) {
        connection.removeEventListener('change', updateStatus)
      }
    }
  }, [])

  return status
}

