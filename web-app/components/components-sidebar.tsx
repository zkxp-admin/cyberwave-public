import * as React from 'react'
import {
  COMPONENT_REGISTRY,
  type ComponentSection,
} from './component-registry'

interface ComponentsSidebarProps {
  activeSection: ComponentSection
  onSectionChange: (section: ComponentSection) => void
}

export function ComponentsSidebar({
  activeSection,
  onSectionChange,
}: ComponentsSidebarProps) {
  return (
    <nav className="p-4">
      <div className="space-y-1">
        {COMPONENT_REGISTRY.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm dark:bg-blue-900/30 dark:text-blue-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50'
              }`}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

// Re-export for backward compatibility
export type { ComponentSection }
