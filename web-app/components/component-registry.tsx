import * as React from 'react'
import {
  BarChart3,
  Bell,
  Cpu,
  Shield,
  Bitcoin,
  type LucideIcon,
} from 'lucide-react'
import {
  BTCBlocks,
  MetricsDials,
  Notifications,
  OverallStatus,
  SystemOverview,
} from '@/components/showcase'

export interface ComponentConfig {
  id: string
  label: string
  icon: LucideIcon
  description: string
  component: React.ComponentType
}

/**
 * Central registry for all showcase components.
 * Add new components here to automatically update the sidebar, dropdown, and page.
 */
export const COMPONENT_REGISTRY: ComponentConfig[] = [
  {
    id: 'overall-status',
    label: 'Overall Status',
    icon: Shield,
    description: 'System health, performance, and security metrics',
    component: OverallStatus,
  },
  {
    id: 'system-overview',
    label: 'System Overview',
    icon: BarChart3,
    description: 'Storage, database, users, and server load statistics',
    component: SystemOverview,
  },
  {
    id: 'metrics-dials',
    label: 'Metrics Dials',
    icon: Cpu,
    description: 'Real-time CPU, memory, and network metrics',
    component: MetricsDials,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    description: 'Notification items with different types and states',
    component: Notifications,
  },
  {
    id: 'btc-blocks',
    label: 'BTC Blocks',
    icon: Bitcoin,
    description: 'Bitcoin blockchain blocks with mining status',
    component: BTCBlocks,
  },
]

// Type-safe component section derived from registry
export type ComponentSection = (typeof COMPONENT_REGISTRY)[number]['id']

// Helper function to get component by id
export function getComponentById(id: string): ComponentConfig | undefined {
  return COMPONENT_REGISTRY.find((config) => config.id === id)
}
