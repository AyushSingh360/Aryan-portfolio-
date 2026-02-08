import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'

import './globals.css'
import PixelSnow from '@/components/PixelSnow'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Backend Engineer - Scalable Systems & Microservices',
  description: 'Backend-focused engineer building production-grade microservices and scalable systems using Java, Spring Boot, Kafka, Redis, and secure architecture patterns.',
  keywords: 'Backend Engineer, Java, Spring Boot, Microservices, APIs, Distributed Systems',
  generator: 'v0.app',
  openGraph: {
    title: 'Backend Engineer Portfolio',
    description: 'Discover projects showcasing expertise in scalable backend architecture',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.className} antialiased overflow-x-hidden`}>
        <div className="fixed inset-0 -z-10 pointer-events-none">
          <PixelSnow
            color="#d2c1fb"
            flakeSize={0.017}
            minFlakeSize={1.25}
            pixelResolution={500}
            speed={0.8}
            density={0.4}
            direction={360}
            brightness={1.7}
            depthFade={8}
            farPlane={29}
            gamma={0.4545}
            variant="snowflake"
          />
        </div>
        {children}
      </body>
    </html>
  )
}
