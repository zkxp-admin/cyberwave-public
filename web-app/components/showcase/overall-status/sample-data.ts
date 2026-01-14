import { Monitor, Shield, Zap, type LucideIcon } from 'lucide-react'
import type { StatusCardData } from './index'

export type StatusCardDataWithIcon = StatusCardData & {
  icon: LucideIcon
}

/**
 * Sample status card data for demonstration purposes
 * Used in the OverallStatus component showcase
 */
export const sampleStatusCards = {
  systemHealth: {
    label: 'System Health',
    value: 85,
    color: 'success' as const,
    icon: Monitor,
    description: 'All systems operational',
  },
  performance: {
    label: 'Performance',
    value: 92,
    color: 'primary' as const,
    icon: Zap,
    description: 'Optimal performance levels',
  },
  security: {
    label: 'Security',
    value: 78,
    color: 'warning' as const,
    icon: Shield,
    description: 'Security measures active',
  },
} satisfies {
  systemHealth: StatusCardDataWithIcon
  performance: StatusCardDataWithIcon
  security: StatusCardDataWithIcon
}