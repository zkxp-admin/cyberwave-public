# Components Showcase

This directory contains the component showcase system with a centralized registry for easy component management.

## Architecture

The showcase uses a **centralized registry pattern** that makes it easy to add new components without modifying multiple files.

### Key Files

- **`component-registry.tsx`** - Central registry where all components are defined
- **`components-sidebar.tsx`** - Desktop sidebar navigation (auto-populated from registry)
- **`components-dropdown.tsx`** - Mobile/tablet dropdown menu (auto-populated from registry)
- **`app/components/page.tsx`** - Main page that dynamically renders components

## Adding a New Component

To add a new component to the showcase, follow these steps:

### 1. Create Your Component

Create your component in the `showcase/` directory:

```tsx
// showcase/my-new-component/index.tsx
export function MyNewComponent() {
  return (
    <div>
      {/* Your component implementation */}
    </div>
  )
}
```

### 2. Export from showcase/index.ts

Add your component to the showcase exports:

```tsx
// showcase/index.ts
export { MyNewComponent } from './my-new-component'
```

### 3. Register in component-registry.tsx

Add your component to the `COMPONENT_REGISTRY` array:

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

Each component in the registry has the following properties:

```tsx
interface ComponentConfig {
  id: string                      // Unique identifier (kebab-case)
  label: string                   // Display name
  icon: LucideIcon               // Icon from lucide-react
  description: string            // Brief description for the dropdown
  component: React.ComponentType // The actual component to render
}
```

## Benefits of This Architecture

1. **Single Source of Truth** - All components defined in one place
2. **Type Safety** - TypeScript ensures valid component IDs
3. **Automatic Updates** - Sidebar and dropdown auto-populate
4. **Easy Maintenance** - Add/remove components in one file
5. **Consistent UI** - All navigation elements stay in sync
6. **Scalable** - Can easily add 10, 20, or 100+ components

## Icons

We use [Lucide React](https://lucide.dev/) for icons. Browse available icons at:
https://lucide.dev/icons/

Common icons used:
- `Shield` - Security/status
- `BarChart3` - Analytics/overview
- `Cpu` - Performance/metrics
- `Bell` - Notifications
- `Database` - Data/storage
- `Network` - Connectivity
- `Settings` - Configuration
- `Bitcoin` - Bitcoin/blockchain related

## Available Components

### BTC Blocks

A Bitcoin blockchain visualization component that displays blocks in a carousel format, showing past mined blocks, the current block being mined, and future pending blocks.

**Location:** `showcase/btc-blocks/`

**Features:**
- **Carousel Navigation**: Desktop shows 3 blocks at a time with smooth transitions (pure Tailwind CSS)
- **Mobile Support**: Single block carousel with swipe navigation
- **Block States**: 
  - Past blocks (mined) - Gray styling
  - Current block (being mined) - Blue highlight with animated border
  - Future blocks (pending) - Purple styling
- **Block Information**:
  - Block number
  - Timestamp (for mined blocks) or Miner name (for pending blocks)
  - Transaction count
  - Block reward (BTC)
  - Block hash (for mined blocks)
  - Block size (for mined blocks)
- **Live Indicator**: Green "Live" badge showing real-time status
- **Dot Navigation**: Clickable dots for quick navigation between blocks

**Data Structure:**
```typescript
interface BTCBlock {
  blockNumber: number
  timestamp: number | null // null for future blocks
  txCount: number | null // null for future blocks
  reward: number
  miner: string | null // null for past blocks, shown for future
  status: 'past' | 'current' | 'future'
  hash?: string // only for past/current blocks
  size?: number // in MB, only for past blocks
}
```

**Usage:**
The component uses sample data by default (`sample-data.ts`). To integrate with real data, replace the `sampleBTCBlocks` import with your data source.

**Styling:**
- Uses Tailwind CSS exclusively for all animations and transitions
- Responsive design with mobile-first approach
- Dark mode support
- Smooth carousel transitions using CSS transforms

## Example: Adding a "User Management" Component

```tsx
// 1. Create the component
// showcase/user-management/index.tsx
export function UserManagement() {
  return <div>User Management Component</div>
}

// 2. Export it
// showcase/index.ts
export { UserManagement } from './user-management'

// 3. Register it
// component-registry.tsx
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
