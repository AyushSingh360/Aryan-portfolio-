'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  stack: string[]
  highlights: string[]
  link?: string
  github?: string
  featured?: boolean
}

export function ProjectCard({ title, description, stack, highlights, link, github, featured = false }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          featured
            ? 'from-cyan-500/20 via-purple-500/10 to-pink-500/10'
            : 'from-cyan-500/10 via-blue-500/5 to-purple-500/10'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Glass background */}
      <div className="relative glass p-6 sm:p-8 h-full min-h-80 flex flex-col justify-between rounded-lg">
        {/* Content */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{title}</h3>
          <p className="text-gray-400 text-sm sm:text-base font-light mb-4 leading-relaxed">{description}</p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {stack.slice(0, featured ? 4 : 3).map((tech, i) => (
              <motion.span
                key={i}
                className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-400 font-light"
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <motion.div
          className="mb-6 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-300"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        >
          <div className="space-y-2 pt-4 border-t border-cyan-500/20">
            {highlights.map((highlight, i) => (
              <motion.p
                key={i}
                className="text-xs text-gray-300 font-light flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="text-cyan-400 mt-1">•</span>
                {highlight}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Footer with links */}
        <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
          <div className="text-xs text-gray-500 font-light">
            {stack.length > 3 && <span>+{stack.length - 3} more</span>}
          </div>
          <div className="flex gap-3">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg text-gray-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Github className="w-4 h-4" />
              </motion.a>
            )}
            {link && (
              <motion.a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg text-gray-400 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
