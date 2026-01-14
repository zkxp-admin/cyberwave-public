import { Database, HardDrive, Server, Users, type LucideIcon } from 'lucide-react'
import type { SystemStatData } from './index'

export type SystemStatWithIcon = SystemStatData & {
  icon: LucideIcon
}

/**
 * Sample system stats data for demonstration purposes
 * Used in the SystemOverview component showcase
 */
export const sampleSystemStats: SystemStatWithIcon[] = [
  {
    label: 'Storage',
    value: 68,
    total: '2.5 TB',
    used: '1.7 TB',
    icon: HardDrive,
    color: 'primary' as const,
  },
  {
    label: 'Database',
    value: 45,
    total: '500 GB',
    used: '225 GB',
    icon: Database,
    color: 'success' as const,
  },
  {
    label: 'Active Users',
    value: 82,
    total: '1,000',
    used: '820',
    icon: Users,
    color: 'warning' as const,
  },
  {
    label: 'Server Load',
    value: 34,
    total: '100%',
    used: '34%',
    icon: Server,
    color: 'default' as const,
  },
]