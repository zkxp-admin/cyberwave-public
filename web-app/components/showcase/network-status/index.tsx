import { Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { Wifi, WifiOff, Activity, Gauge, Clock, Save } from 'lucide-react'
import { z } from 'zod'
import { sampleNetworkStatus } from './sample-data'

// Zod Schema for validation
export const networkStatusSchema = z.object({
  isOnline: z.boolean(),
  connectionType: z.string().nullable(),
  effectiveType: z.string().nullable(),
  downlink: z.number().nullable(),
  rtt: z.number().nullable(),
  saveData: z.boolean().nullable(),
})

export type NetworkStatusData = z.infer<typeof networkStatusSchema>

const getConnectionTypeLabel = (type: string | null) => {
  if (!type) return 'Unknown'
  const types: Record<string, string> = {
    bluetooth: 'Bluetooth',
    cellular: 'Cellular',
    ethernet: 'Ethernet',
    none: 'None',
    wifi: 'WiFi',
    wimax: 'WiMAX',
    other: 'Other',
    unknown: 'Unknown',
  }
  return types[type] || type
}

const getEffectiveTypeLabel = (type: string | null) => {
  if (!type) return 'Unknown'
  return type.toUpperCase()
}

const formatSpeed = (downlink: number | null) => {
  if (!downlink) return 'N/A'
  return `${downlink} Mbps`
}

const formatRTT = (rtt: number | null) => {
  if (!rtt) return 'N/A'
  return `${rtt} ms`
}

interface NetworkStatusItemProps {
  icon: typeof Activity
  label: string
  value: string | React.ReactNode
}

function NetworkStatusItem({ icon: Icon, label, value }: NetworkStatusItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-default-100 p-2">
        <Icon className="h-4 w-4 text-default-600" />
      </div>
      <div className="flex-1">
        <p className="text-default-500 text-sm">{label}</p>
        <div className="text-default-700 text-sm font-medium">{value}</div>
      </div>
    </div>
  )
}

export function NetworkStatus() {
  // Validate data with schema
  const validation = networkStatusSchema.safeParse(sampleNetworkStatus)
  if (!validation.success) {
    console.warn('NetworkStatus validation failed:', validation.error)
  }

  const networkStatus = sampleNetworkStatus

  return (
    <Card
      isHoverable={true}
      className="card-color-base h-full w-full rounded-3xl"
    >
      <CardHeader className="pb-0">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            {networkStatus.isOnline ? (
              <Wifi className="h-5 w-5 text-success" />
            ) : (
              <WifiOff className="h-5 w-5 text-danger" />
            )}
            <h2 className="text-xl font-semibold">Network Status</h2>
          </div>
          <Chip
            color={networkStatus.isOnline ? 'success' : 'danger'}
            size="sm"
            variant="flat"
          >
            {networkStatus.isOnline ? 'Online' : 'Offline'}
          </Chip>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-2 gap-4">
          <NetworkStatusItem
            icon={Activity}
            label="Connection Type"
            value={getConnectionTypeLabel(networkStatus.connectionType)}
          />
          <NetworkStatusItem
            icon={Gauge}
            label="Effective Type"
            value={getEffectiveTypeLabel(networkStatus.effectiveType)}
          />
          <NetworkStatusItem
            icon={Activity}
            label="Downlink Speed"
            value={formatSpeed(networkStatus.downlink)}
          />
          <NetworkStatusItem
            icon={Clock}
            label="Round Trip Time"
            value={formatRTT(networkStatus.rtt)}
          />
          {networkStatus.saveData !== null && (
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-default-100 p-2">
                <Save className="h-4 w-4 text-default-600" />
              </div>
              <div className="flex-1">
                <p className="text-default-500 text-sm">Data Saver</p>
                <Chip
                  color={networkStatus.saveData ? 'warning' : 'success'}
                  size="sm"
                  variant="flat"
                >
                  {networkStatus.saveData ? 'Enabled' : 'Disabled'}
                </Chip>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
