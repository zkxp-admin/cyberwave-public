import type { NetworkStatusData } from './index'

/**
 * Sample network status data for demonstration purposes
 * Used in the NetworkStatus component showcase
 */
export const sampleNetworkStatus: NetworkStatusData = {
  isOnline: true,
  connectionType: 'wifi',
  effectiveType: '4g',
  downlink: 10,
  rtt: 50,
  saveData: false,
} satisfies NetworkStatusData

export const sampleNetworkStatusOffline: NetworkStatusData = {
  isOnline: false,
  connectionType: null,
  effectiveType: null,
  downlink: null,
  rtt: null,
  saveData: null,
} satisfies NetworkStatusData

export const sampleNetworkStatusSlow: NetworkStatusData = {
  isOnline: true,
  connectionType: 'cellular',
  effectiveType: '2g',
  downlink: 0.5,
  rtt: 200,
  saveData: true,
} satisfies NetworkStatusData
