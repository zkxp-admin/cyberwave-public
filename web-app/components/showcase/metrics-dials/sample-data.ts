import { Cpu, Database, Wifi, type LucideIcon } from 'lucide-react'
import type { MetricData } from './index'

export type MetricDataWithIcon = MetricData & {
  icon: LucideIcon
}

/**
 * Sample metrics data for demonstration purposes
 * Used in the MetricsDials component showcase
 */
export const sampleMetricsData: MetricDataWithIcon[] = [
  {
    label: 'CPU Usage',
    value: 67,
    color: 'primary' as const,
    icon: Cpu,
  },
  {
    label: 'Memory',
    value: 84,
    color: 'warning' as const,
    icon: Database,
  },
  {
    label: 'Network',
    value: 45,
    color: 'success' as const,
    icon: Wifi,
  },
]