import React from "react"
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'

import './globals.css'
import PixelSnow from '@/components/PixelSnow'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Aryan Raj - Backend Engineer | Agentic AI Platform',
  description: 'Backend Engineer specializing in Go, Java, REST APIs, and Clean Architecture. Building scalable systems with Echo and Spring Boot, with expertise in LLM Integration and Agent Workflows.',
  keywords: 'Backend Engineer, Go, Golang, Java, Spring Boot, Echo, Microservices, APIs, LLM Integration, Agent Workflows, Agentic AI, Clean Architecture',
  openGraph: {
    title: 'Aryan Raj - Backend Engineer Portfolio',
    description: 'Building scalable backend systems with Go, Java, and modern frameworks',
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
