'use client'

import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from '@heroui/toast'
import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem={true}
        disableTransitionOnChange={true}
      >
        <HeroUIProvider>
          <ToastProvider placement={'top-center'} toastOffset={20} />
          {children}
        </HeroUIProvider>
      </ThemeProvider>
    </Provider>
  )
}
