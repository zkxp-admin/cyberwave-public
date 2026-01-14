import { Card, CardBody, CircularProgress } from '@heroui/react'
import { z } from 'zod'
import { sampleMetricsData } from './sample-data'

// Zod Schema for validation
export const metricDataSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.number().min(0).max(100, 'Value must be between 0 and 100'),
  color: z.enum(['primary', 'success', 'warning', 'danger']),
})

export const metricsDialsSchema = z.object({
  metricsData: z
    .array(metricDataSchema)
    .min(1, 'At least one metric is required'),
})

export type MetricData = z.infer<typeof metricDataSchema>
export type MetricsDialsData = z.infer<typeof metricsDialsSchema>

export function MetricsDials() {
  // Validate data with schema
  const validation = metricsDialsSchema.safeParse({
    metricsData: sampleMetricsData,
  })
  if (!validation.success) {
    console.warn('MetricsDials validation failed:', validation.error)
  }

  return (
    <Card isHoverable={true} className="card-color-base w-full rounded-3xl">
      <CardBody className="px-4 py-4">
        <h2 className="mb-4 text-lg font-semibold">Real-time Metrics</h2>
        <div className="flex flex-row items-center justify-around gap-4">
          {sampleMetricsData.map((metric, index: number) => {
            const Icon = metric.icon
            // Validate individual metric
            const metricValidation = metricDataSchema.safeParse(metric)
            if (!metricValidation.success) {
              console.warn(
                `Metric ${index} validation failed:`,
                metricValidation.error
              )
            }

            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                <Icon className="text-default-600 h-5 w-5" />
                <span className="text-default-700 text-center text-xs font-medium">
                  {metric.label}
                </span>
                <CircularProgress
                  aria-label={metric.label}
                  value={metric.value}
                  color={metric.color}
                  showValueLabel={true}
                  classNames={{
                    svg: 'w-16 h-16',
                    value: 'text-xs font-semibold',
                  }}
                />
              </div>
            )
          })}
        </div>
      </CardBody>
    </Card>
  )
}