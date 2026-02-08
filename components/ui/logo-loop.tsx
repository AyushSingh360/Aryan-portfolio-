'use client'

import React from 'react'

interface LogoLoopProps {
  logos: Array<{
    name: string
    icon: React.ReactNode
  }>
  speed?: number
  gap?: number
}

export function LogoLoop({ logos, speed = 30, gap = 40 }: LogoLoopProps) {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos]

  const containerStyle = {
    animation: `scroll linear ${speed}s infinite`,
  }

  return (
    <>
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-${logos.length * 100}px - ${(logos.length) * gap}px));
          }
        }

        .logo-loop-container {
          display: flex;
          gap: ${gap}px;
          width: fit-content;
          animation: scroll linear ${speed}s infinite;
        }

        .logo-loop-container:hover {
          animation-play-state: paused;
        }

        .logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 100px;
          height: 100px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .logo-item:hover {
          background: rgba(34, 211, 238, 0.1);
          border-color: rgba(34, 211, 238, 0.3);
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.2);
          transform: scale(1.05);
        }

        .logo-item svg {
          width: 40px;
          height: 40px;
          color: #22d3ee;
        }

        .logo-label {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          font-size: 12px;
          color: #94a3b8;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .logo-item:hover .logo-label {
          opacity: 1;
        }
      `}</style>

      <div className="relative overflow-hidden py-12">
        <div className="logo-loop-container">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="logo-item relative"
              title={logo.name}
            >
              {logo.icon}
              <span className="logo-label">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
