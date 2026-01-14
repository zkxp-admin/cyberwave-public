import '@/app/globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { inter, orbitron } from '@/fonts'
import Providers from './providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: {
    default: 'Web Components',
    template: `%s | Web Components`,
  },
  description: 'CyberWave Web Components Showcase',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${orbitron.variable}`}
      suppressHydrationWarning={true}
    >
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Web Components" />

      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000000"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#f2f2f3"
      />

      {/* RealFaviconGenerator */}
      <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
