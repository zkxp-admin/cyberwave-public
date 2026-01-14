'use client'

import { Menu, X } from 'lucide-react'
import { ThemeSwitch } from './theme-switch'

interface ComponentsHeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function ComponentsHeader({
  isSidebarOpen,
  onToggleSidebar,
}: ComponentsHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 lg:block"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          <h1 className="font-orbitron text-2xl font-medium text-gray-900 dark:text-gray-100 sm:text-3xl">
            Components
          </h1>
        </div>
        <ThemeSwitch />
      </div>
    </header>
  )
}
