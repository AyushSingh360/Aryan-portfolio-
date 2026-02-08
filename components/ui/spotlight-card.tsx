'use client'

import React from "react"

import { useRef, useState, useEffect } from 'react'

export const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = '#22d3ee30',
}: {
  children: any
  className?: string
  spotlightColor?: string
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return

    const rect = divRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(0.6)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => {
    setOpacity(0.6)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 ${className}`}
    >
      <div
        className="pointer-events-none absolute transition-opacity duration-300"
        style={{
          width: '100px',
          height: '100px',
          opacity: opacity,
          left: `${position.x - 50}px`,
          top: `${position.y - 50}px`,
          background: `radial-gradient(circle, ${spotlightColor} 0%, transparent 70%)`,
          filter: 'blur(30px)',
        }}
      />
      {children}
    </div>
  )
}
