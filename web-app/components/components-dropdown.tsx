'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import {
  COMPONENT_REGISTRY,
  type ComponentSection,
} from './component-registry'

interface ComponentsDropdownProps {
  activeSection: ComponentSection
  onSectionChange: (section: ComponentSection) => void
}

export function ComponentsDropdown({
  activeSection,
  onSectionChange,
}: ComponentsDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const activeItem = COMPONENT_REGISTRY.find((item) => item.id === activeSection)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (section: ComponentSection) => {
    onSectionChange(section)
    setIsOpen(false)
  }

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-3">
          {activeItem && (
            <>
              <activeItem.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="font-semibold">{activeItem.label}</span>
            </>
          )}
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
          <div className="py-1">
            {COMPONENT_REGISTRY.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id as ComponentSection)}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon
                    className={`mt-0.5 h-5 w-5 flex-shrink-0 ${
                      isActive
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm font-semibold ${
                        isActive ? 'text-blue-700 dark:text-blue-300' : ''
                      }`}
                    >
                      {item.label}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-1 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
