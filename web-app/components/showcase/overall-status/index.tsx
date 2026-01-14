import { Card, CardBody, CircularProgress } from '@heroui/react'
import { type LucideIcon, Monitor, Shield, Zap } from 'lucide-react'
import { z } from 'zod'
import { sampleStatusCards } from './sample-data'

// Zod Schema for validation
export const statusCardSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.number().min(0).max(100, 'Value must be between 0 and 100'),
  color: z.enum(['success', 'primary', 'warning', 'danger']),
  description: z.string().min(1, 'Description is required'),
})

export type StatusCardData = z.infer<typeof statusCardSchema>

interface StatusCardProps {
  label: string
  value: number
  color: 'success' | 'primary' | 'warning' | 'danger'
  icon: LucideIcon
  description: string
}

function StatusCard({
  label,
  value,
  color,
  icon: Icon,
  description,
}: StatusCardProps) {
  // Validate props with schema
  const validation = statusCardSchema.safeParse({
    label,
    value,
    color,
    description,
  })
  if (!validation.success) {
    console.warn('StatusCard validation failed:', validation.error)
  }
  return (
    <Card isHoverable={true} className="card-color-base w-full rounded-3xl">
      <CardBody className="flex flex-row items-center justify-between px-4 py-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <Icon className="text-default-600 h-5 w-5" />
            <h3 className="text-lg font-semibold">{label}</h3>
          </div>
          <p className="text-default-500 text-sm">{description}</p>
        </div>

        <CircularProgress
          aria-label={label}
          size="lg"
          value={value}
          color={color}
          showValueLabel={true}
          classNames={{
            svg: 'w-20 h-20',
            value: 'text-lg font-semibold',
          }}
        />
      </CardBody>
    </Card>
  )
}

export function SystemHealthCard() {
  const data = sampleStatusCards.systemHealth
  return (
    <StatusCard
      label={data.label}
      value={data.value}
      color={data.color}
      icon={data.icon}
      description={data.description}
    />
  )
}

export function PerformanceCard() {
  const data = sampleStatusCards.performance
  return (
    <StatusCard
      label={data.label}
      value={data.value}
      color={data.color}
      icon={data.icon}
      description={data.description}
    />
  )
}

export function SecurityCard() {
  const data = sampleStatusCards.security
  return (
    <StatusCard
      label={data.label}
      value={data.value}
      color={data.color}
      icon={data.icon}
      description={data.description}
    />
  )
}

export function OverallStatus() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      <SystemHealthCard />
      <PerformanceCard />
      <SecurityCard />
    </div>
  )
}