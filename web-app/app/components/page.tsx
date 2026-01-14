'use client'

import { useState } from 'react'
import { ComponentsHeader } from '@/components/components-header'
import { ComponentsSidebar } from '@/components/components-sidebar'
import { ComponentsDropdown } from '@/components/components-dropdown'
import { useComponentSection } from '@/hooks/use-component-section'
import { getComponentById } from '@/components/component-registry'

export default function ComponentsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { activeSection, setActiveSection } = useComponentSection()

  const config = getComponentById(activeSection)
  const Component = config?.component

  return (
    <main className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <ComponentsHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Mobile & Tablet: Vertical layout with dropdown */}
      <div className="flex flex-1 flex-col lg:hidden">
        <div className="border-b border-gray-200 bg-white px-4 py-4 dark:border-gray-700 dark:bg-gray-800 sm:px-6">
          <ComponentsDropdown
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>
        <div className="flex-1 p-4 sm:p-6 md:p-8">
          {Component && (
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
          )}
        </div>
      </div>

      {/* Desktop: Sidebar layout */}
      <div className="hidden flex-1 lg:flex">
        <aside
          className={`shrink-0 border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 ${
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
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-6 lg:p-8 xl:p-10">
            {Component && (
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
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
