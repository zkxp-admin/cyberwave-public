import type { NotificationData } from './index'

/**
 * Sample notification data for demonstration purposes
 * Used in the NotificationItem component showcase
 */
export const sampleNotifications: NotificationData[] = [
  {
    id: '1',
    type: 'like',
    title: 'New Like',
    message: 'John Doe liked your post',
    timestamp: '2 minutes ago',
    isRead: false,
    user: {
      name: 'John Doe',
      avatar:
        'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    },
  },
  {
    id: '2',
    type: 'comment',
    title: 'New Comment',
    message: 'Jane Smith commented on your photo',
    timestamp: '15 minutes ago',
    isRead: false,
    user: {
      name: 'Jane Smith',
      avatar:
        'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    },
  },
  {
    id: '3',
    type: 'follow',
    title: 'New Follower',
    message: 'Alice Johnson started following you',
    timestamp: '1 hour ago',
    isRead: true,
    user: {
      name: 'Alice Johnson',
      avatar:
        'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    },
  },
  {
    id: '4',
    type: 'system',
    title: 'System Update',
    message: 'Your account settings have been updated successfully',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'mention',
    title: 'You were mentioned',
    message: 'Bob Wilson mentioned you in a comment',
    timestamp: '5 hours ago',
    isRead: false,
    user: {
      name: 'Bob Wilson',
    },
  },
]