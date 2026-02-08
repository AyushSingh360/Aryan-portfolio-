'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export function TechStack() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const technologies = [
    { name: 'Java', icon: '☕' },
    { name: 'Spring Boot', icon: '🌱' },
    { name: 'Spring Security', icon: '🔒' },
    { name: 'Kafka', icon: '📨' },
    { name: 'Redis', icon: '⚡' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'MySQL', icon: '🗄️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'React', icon: '⚛️' },
    { name: 'JWT', icon: '🔑' },
    { name: 'Git', icon: '📚' },
    { name: 'GitHub', icon: '🐙' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} id="tech" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={itemVariants}
            className="text-cyan-400 text-sm font-semibold uppercase tracking-widest"
          >
            Tech Stack
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mt-2 text-white">
            Technologies & Tools
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg mt-4 max-w-2xl mx-auto font-light"
          >
            Production-grade technologies powering scalable backend systems and microservices
          </motion.p>
        </motion.div>

        {/* Infinite Scroll Container */}
        <motion.div
          className="relative overflow-hidden rounded-lg glass p-8"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Scrolling track */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8 min-w-max"
              animate={{ x: [-1000, 0] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              }}
              onHoverStart={(e) => {
                if (e instanceof MouseEvent) {
                  ;(e.target as HTMLElement).parentElement?.style.setProperty('animation-play-state', 'paused')
                }
              }}
            >
              {[...Array(2)].map((_, iteration) =>
                technologies.map((tech, index) => (
                  <motion.div
                    key={`${iteration}-${index}`}
                    className="flex-shrink-0"
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                  >
                    <motion.div
                      className="flex flex-col items-center gap-3 px-8 py-6 rounded-lg border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 cursor-default"
                      whileHover={{
                        scale: 1.1,
                        borderColor: 'rgba(34, 211, 238, 0.5)',
                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.3)',
                      }}
                    >
                      <span className="text-3xl">{tech.icon}</span>
                      <p className="text-sm font-semibold text-white whitespace-nowrap">{tech.name}</p>
                      {hoveredIndex === index && (
                        <motion.div
                          layoutId="hover"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )),
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Grid of categories */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {[
            {
              title: 'Backend Framework',
              techs: ['Spring Boot', 'Spring Security', 'Spring Data'],
            },
            {
              title: 'Message & Cache',
              techs: ['Kafka', 'Redis', 'RabbitMQ'],
            },
            {
              title: 'Databases',
              techs: ['MySQL', 'MongoDB Atlas', 'PostgreSQL'],
            },
            {
              title: 'Deployment',
              techs: ['Docker', 'Kubernetes', 'AWS/GCP'],
            },
            {
              title: 'API & Security',
              techs: ['JWT', 'OAuth 2.0', 'REST APIs'],
            },
            {
              title: 'Version Control',
              techs: ['Git', 'GitHub', 'CI/CD Pipelines'],
            },
          ].map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass p-6 rounded-lg border border-cyan-500/20"
            >
              <h3 className="text-cyan-400 font-semibold mb-3 text-sm uppercase tracking-wider">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs text-cyan-300 font-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background accent */}
      <motion.div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </section>
  )
}
