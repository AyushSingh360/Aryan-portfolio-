'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Animated gradient overlays */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(240, 247, 249, 1) 0%, transparent 50%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-72 h-72 rounded-full mix-blend-screen"
          style={{
            background: `radial-gradient(circle, ${i % 3 === 0 ? 'rgba(34, 211, 238, 0.08)' : i % 3 === 1 ? 'rgba(168, 85, 247, 0.08)' : 'rgba(236, 72, 153, 0.08)'
              } 0%, transparent 70%)`,
            filter: 'blur(60px)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, 100 + Math.random() * 100, 0],
            x: [0, 50 + Math.random() * 50, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Parallax lines for depth */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        style={{
          y: scrollY * 0.5,
        }}
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(243, 246, 247, 1)" />
            <stop offset="100%" stopColor="rgba(249, 246, 252, 1)" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}
