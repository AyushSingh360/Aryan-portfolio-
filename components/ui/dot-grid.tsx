'use client'

import React, { useEffect, useRef } from 'react'

interface DotGridProps {
  dotSize?: number
  gap?: number
  color?: string
  opacity?: number
}

export function DotGrid({
  dotSize = 2,
  gap = 30,
  color = '#22d3ee',
  opacity = 0.15,
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to window size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()

    // Draw grid of dots
    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Parse color to RGB
      const colorHex = color.replace('#', '')
      const r = parseInt(colorHex.substring(0, 2), 16)
      const g = parseInt(colorHex.substring(2, 4), 16)
      const b = parseInt(colorHex.substring(4, 6), 16)

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`

      for (let x = 0; x < canvas.width; x += gap) {
        for (let y = 0; y < canvas.height; y += gap) {
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    drawGrid()

    // Handle window resize
    const handleResize = () => {
      setCanvasSize()
      drawGrid()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [dotSize, gap, color, opacity])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
