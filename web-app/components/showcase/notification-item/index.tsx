import { Avatar, Card, CardBody } from '@heroui/react'
import { Bell, Heart, MessageCircle, Shield, UserPlus } from 'lucide-react'
import { z } from 'zod'
import { sampleNotifications } from './sample-data'

// Zod Schema for validation
export const notificationDataSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  type: z.enum(['like', 'comment', 'mention', 'follow', 'system']),
  title: z.string().min(1, 'Title is required'),
  message: z.string().min(1, 'Message is required'),
  timestamp: z.string().min(1, 'Timestamp is required'),
  isRead: z.boolean(),
  user: z
    .object({
      name: z.string().min(1, 'User name is required'),
      avatar: z.string().url().optional(),
    })
    .optional(),
})

export type NotificationType =
  | 'like'
  | 'comment'
  | 'mention'
  | 'follow'
  | 'system'
export type NotificationData = z.infer<typeof notificationDataSchema>

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return Heart
    case 'comment':
    case 'mention':
      return MessageCircle
    case 'follow':
      return UserPlus
    case 'system':
      return Shield
    default:
      return Bell
  }
}

const getNotificationColor = (
  type: NotificationType
): 'danger' | 'primary' | 'success' | 'warning' | 'default' => {
  switch (type) {
    case 'like':
      return 'danger'
    case 'comment':
    case 'mention':
      return 'primary'
    case 'follow':
      return 'success'
    case 'system':
      return 'warning'
    default:
      return 'default'
  }
}

interface NotificationItemProps {
  notification: NotificationData
}

export function NotificationItem({ notification }: NotificationItemProps) {
  // Validate notification data
  const validation = notificationDataSchema.safeParse(notification)
  if (!validation.success) {
    console.warn('NotificationItem validation failed:', validation.error)
  }

  const Icon = getNotificationIcon(notification.type)
  const iconColor = getNotificationColor(notification.type)

  return (
    <Card
      className={`card-color-base w-full transition-colors ${
        notification.isRead
          ? 'bg-default-50'
          : 'bg-default-100 border-primary-200'
      }`}
    >
      <CardBody className="p-4">
        <div className="flex items-start gap-3">
          {notification.user?.avatar ? (
            <div className="relative">
              <Avatar
                src={notification.user.avatar}
                alt={notification.user.name}
                size="sm"
                className="shrink-0"
              />
              <div
                className={`absolute -right-1 -bottom-1 p-1 bg-${iconColor} rounded-full`}
              >
                <Icon className="h-3 w-3 text-white" />
              </div>
            </div>
          ) : (
            <div
              className={`shrink-0 p-2 bg-${iconColor} bg-opacity-10 rounded-full`}
            >
              <Icon className={`h-5 w-5 text-${iconColor}`} />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-start justify-between">
              <h3
                className={`text-sm font-medium ${
                  notification.isRead ? 'text-default-600' : 'text-default-900'
                }`}
              >
                {notification.title}
              </h3>
              {!notification.isRead && (
                <div className="bg-primary ml-2 h-2 w-2 shrink-0 rounded-full" />
              )}
            </div>

            <p
              className={`text-sm leading-relaxed ${
                notification.isRead ? 'text-default-500' : 'text-default-700'
              }`}
            >
              {notification.message}
            </p>

            <span className="text-default-400 mt-2 block text-xs">
              {notification.timestamp}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export function Notifications() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {sampleNotifications.map((notification: NotificationData) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  )
}