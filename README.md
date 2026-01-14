# CyberWave Web Components Showcase

A collection of reusable React components built with Next.js, TypeScript, and Tailwind CSS. This showcase demonstrates various UI components for dashboards, analytics, and system monitoring.

## Tech Stack

This project is built with the following technologies and libraries:

- **[Next.js](https://nextjs.org/)** (v16.1.1) - React framework for production
- **[React](https://react.dev/)** (v19.2.3) - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** (v4.1.18) - Utility-first CSS framework
- **[HeroUI](https://heroui.com/)** - React component library
  - `@heroui/react` - Core component library
  - `@heroui/toast` - Toast notification system
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Theme switching (dark/light mode)
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Vaul](https://vaul.emilkowal.ski/)** - Drawer component library

## Available Components

### Overall Status
**Description:** System health, performance, and security metrics

Displays key system metrics with circular progress indicators, showing status cards for different aspects of system health.

### System Overview
**Description:** Storage, database, users, and server load statistics

Provides an overview of system resources including storage capacity, database status, user counts, and server load metrics.

### Metrics Dials
**Description:** Real-time CPU, memory, and network metrics

Visual dial indicators showing real-time system performance metrics including CPU usage, memory consumption, and network activity.

### Notifications
**Description:** Notification items with different types and states

A notification system component that displays various notification types (success, warning, error, info) with different states and actions.

### BTC Blocks
**Description:** Bitcoin blockchain blocks with mining status

A Bitcoin blockchain visualization component that displays blocks in a carousel format, showing past mined blocks, the current block being mined, and future pending blocks. Features include:
- Carousel navigation (desktop shows 3 blocks, mobile shows 1)
- Block states: past (mined), current (being mined), future (pending)
- Block information: number, timestamp, transaction count, reward, hash, and size
- Live indicator and dot navigation

## Adding a New Component

To add a new component to the showcase, follow these three simple steps:

### Step 1: Create Your Component

Create your component in the `web-app/components/showcase/` directory:

```tsx
// web-app/components/showcase/my-new-component/index.tsx
export function MyNewComponent() {
  return (
    <div>
      {/* Your component implementation */}
    </div>
  )
}
```

### Step 2: Export from showcase/index.ts

Add your component to the showcase exports:

```tsx
// web-app/components/showcase/index.ts
export { MyNewComponent } from './my-new-component'
```

### Step 3: Register in component-registry.tsx

Add your component to the `COMPONENT_REGISTRY` array in `web-app/components/component-registry.tsx`:

```tsx
import { MyNewComponent } from '@/components/showcase'
import { YourIcon } from 'lucide-react' // Choose an appropriate icon

export const COMPONENT_REGISTRY: ComponentConfig[] = [
  // ... existing components
  {
    id: 'my-new-component',
    label: 'My New Component',
    icon: YourIcon,
    description: 'Brief description of what this component does',
    component: MyNewComponent,
  },
]
```

### That's it! 🎉

Your component will automatically appear in:
- ✅ The sidebar navigation (desktop)
- ✅ The dropdown menu (mobile/tablet)
- ✅ The main page with proper routing
- ✅ Type-safe component selection

## Component Registry Structure

Each component in the registry requires:

- **id**: Unique identifier in kebab-case (e.g., `'my-new-component'`)
- **label**: Display name shown in navigation (e.g., `'My New Component'`)
- **icon**: Icon from [Lucide React](https://lucide.dev/icons/)
- **description**: Brief description shown in the dropdown menu
- **component**: The actual React component to render

## Icons

We use [Lucide React](https://lucide.dev/) for icons. Browse available icons at: https://lucide.dev/icons/

Common icons used:
- `Shield` - Security/status
- `BarChart3` - Analytics/overview
- `Cpu` - Performance/metrics
- `Bell` - Notifications
- `Bitcoin` - Bitcoin/blockchain related

## Example: Adding a "User Management" Component

```tsx
// 1. Create the component
// web-app/components/showcase/user-management/index.tsx
export function UserManagement() {
  return <div>User Management Component</div>
}

// 2. Export it
// web-app/components/showcase/index.ts
export { UserManagement } from './user-management'

// 3. Register it
// web-app/components/component-registry.tsx
import { Users } from 'lucide-react'
import { UserManagement } from '@/components/showcase'

export const COMPONENT_REGISTRY: ComponentConfig[] = [
  // ... existing components
  {
    id: 'user-management',
    label: 'User Management',
    icon: Users,
    description: 'Manage users, roles, and permissions',
    component: UserManagement,
  },
]
```

Done! The component is now fully integrated into the showcase.
