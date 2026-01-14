'use client'

import * as React from 'react'
import { Menu, X } from 'lucide-react'
import { ComponentsSidebar } from '@/components/components-sidebar'
import { ComponentsDropdown } from '@/components/components-dropdown'
import { ThemeSwitch } from '@/components/theme-switch'
import {
  COMPONENT_REGISTRY,
  getComponentById,
  type ComponentSection,
} from '@/components/component-registry'

export default function ComponentsPage() {
  const [activeSection, setActiveSection] = React.useState<ComponentSection>(
    COMPONENT_REGISTRY[0].id as ComponentSection
  )
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  const renderComponent = () => {
    const config = getComponentById(activeSection)
    if (!config) return null

    const Component = config.component

    return (
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
            {config.label}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            {config.description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <Component />
        </div>
      </div>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header - Spans full width on all screens */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle Button - Desktop Only */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
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

      {/* Mobile & Tablet: Vertical layout with dropdown (< lg) */}
      <div className="flex flex-1 flex-col lg:hidden">
        {/* Dropdown Navigation */}
        <div className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
          <ComponentsDropdown
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8">{renderComponent()}</div>
      </div>

      {/* Desktop: Sidebar layout (>= lg) */}
      <div className="hidden flex-1 lg:flex">
        {/* Sidebar - Collapsible */}
        <aside
          className={`flex-shrink-0 border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 ${
            isSidebarOpen ? 'w-64 xl:w-72' : 'w-0'
          }`}
        >
          <div
            className={`h-full overflow-y-auto transition-opacity duration-300 ${
              isSidebarOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ComponentsSidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 lg:p-8 xl:p-10">
            {renderComponent()}
          </div>
        </div>
      </div>
    </main>
  )
}
