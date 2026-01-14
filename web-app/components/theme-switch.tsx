'use client'

import { useIsSSR } from '@react-aria/ssr'
import { Moon, Smartphone, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import type { FC, MouseEvent } from 'react'

export interface ThemeSwitchProps {
  className?: string
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { theme, setTheme } = useTheme()
  const isSSR = useIsSSR()

  const cycleTheme = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getCurrentTheme = () => {
    if (isSSR) {
      return 'system'
    }
    return theme || 'system'
  }

  const currentTheme = getCurrentTheme()

  const getIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <Sun className="h-5 w-5 animate-in spin-in-180 duration-300" />
      case 'dark':
        return <Moon className="h-5 w-5 animate-in spin-in-180 duration-300" />
      default:
        return (
          <Smartphone className="h-5 w-5 animate-in spin-in-180 duration-300" />
        )
    }
  }

  const getLabel = () => {
    switch (currentTheme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system mode'
      default:
        return 'Switch to light mode'
    }
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 ${className || ''}`}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span className="sr-only">{getLabel()}</span>
      {getIcon()}
    </button>
  )
}
