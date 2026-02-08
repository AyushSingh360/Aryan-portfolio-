'use client'

import React, { useEffect, useRef } from 'react'

interface HyperspeedProps {
  speed?: number
  strength?: number
  direction?: 'forward' | 'backward'
}

export function Hyperspeed({ speed = 0.02, strength = 0.05, direction = 'forward' }: HyperspeedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()

    const lines: Array<{
      x: number
      y: number
      length: number
      opacity: number
    }> = []

    const generateLines = () => {
      lines.length = 0
      for (let i = 0; i < 100; i++) {
        lines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          length: Math.random() * 50 + 10,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    generateLines()

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 26, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        const directionMultiplier = direction === 'forward' ? 1 : -1

        line.x += speed * 100 * directionMultiplier
        line.opacity = Math.sin(Date.now() * 0.001 + line.x * 0.01) * 0.25 + 0.25

        if (direction === 'forward' && line.x > canvas.width + 100) {
          line.x = -100
        } else if (direction === 'backward' && line.x < -100) {
          line.x = canvas.width + 100
        }

        const gradient = ctx.createLinearGradient(
          line.x,
          line.y,
          line.x + line.length,
          line.y - line.length * 0.5,
        )

        gradient.addColorStop(0, `rgba(34, 211, 238, ${line.opacity * 0.1})`)
        gradient.addColorStop(0.5, `rgba(34, 211, 238, ${line.opacity})`)
        gradient.addColorStop(1, `rgba(34, 211, 238, ${line.opacity * 0.1})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2 + Math.sin(Date.now() * 0.005) * 1
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.length, line.y - line.length * 0.5)
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [speed, direction])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
