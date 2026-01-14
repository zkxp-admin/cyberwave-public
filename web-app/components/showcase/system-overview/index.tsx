import { Card, CardBody, CardHeader, Progress } from '@heroui/react'
import { z } from 'zod'
import { sampleSystemStats } from './sample-data'

// Zod Schema for validation
export const systemStatSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.number().min(0).max(100, 'Value must be between 0 and 100'),
  total: z.string().min(1, 'Total is required'),
  used: z.string().min(1, 'Used is required'),
  color: z.enum(['primary', 'success', 'warning', 'danger', 'default']),
})

export const systemOverviewSchema = z.object({
  systemStats: z
    .array(systemStatSchema)
    .min(1, 'At least one stat is required'),
})

export type SystemStatData = z.infer<typeof systemStatSchema>
export type SystemOverviewData = z.infer<typeof systemOverviewSchema>

export function SystemOverview() {
  // Validate data with schema
  const validation = systemOverviewSchema.safeParse({
    systemStats: sampleSystemStats,
  })
  if (!validation.success) {
    console.warn('SystemOverview validation failed:', validation.error)
  }

  return (
    <Card
      isHoverable={true}
      className="card-color-base h-full w-full rounded-3xl"
    >
      <CardHeader className="pb-0">
        <h2 className="text-xl font-semibold">System Overview</h2>
      </CardHeader>
      <CardBody className="space-y-4">
        {sampleSystemStats.map((stat, index: number) => {
          const Icon = stat.icon
          // Validate individual stat
          const statValidation = systemStatSchema.safeParse(stat)
          if (!statValidation.success) {
            console.warn(
              `SystemStat ${index} validation failed:`,
              statValidation.error
            )
          }

          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="text-default-600 h-4 w-4" />
                  <span className="text-default-700 text-sm font-medium">
                    {stat.label}
                  </span>
                </div>
                <span className="text-default-500 text-xs">
                  {stat.used} / {stat.total}
                </span>
              </div>
              <Progress
                aria-label={stat.label}
                value={stat.value}
                color={stat.color}
                className="w-full"
                size="sm"
              />
            </div>
          )
        })}
      </CardBody>
    </Card>
  )
}