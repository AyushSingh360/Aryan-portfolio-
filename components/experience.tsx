'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const timeline = [
    {
      year: '2023 - Present',
      role: 'Senior Backend Engineer',
      company: 'TechCorp Solutions',
      description:
        'Leading microservices architecture design and implementation. Architected Kafka-based event streaming system handling 1M+ events/day.',
      achievements: [
        'Designed and deployed 5+ microservices reducing latency by 40%',
        'Implemented Redis caching strategy improving throughput 3x',
        'Established code review standards and best practices',
      ],
    },
    {
      year: '2022 - 2023',
      role: 'Backend Engineer',
      company: 'Digital Innovations Inc',
      description:
        'Developed Spring Boot applications and maintained critical production systems. Implemented secure API authentication and authorization.',
      achievements: [
        'Built healthcare management suite with 10+ microservices',
        'Implemented JWT-based authentication system',
        'Reduced API response time by 50% through optimization',
      ],
    },
    {
      year: '2021 - 2022',
      role: 'Junior Backend Developer',
      company: 'StartUp Ventures',
      description: 'Started career building REST APIs and database-driven applications using Spring Boot and MySQL.',
      achievements: [
        'Developed 15+ REST endpoints for e-commerce platform',
        'Optimized database queries reducing load by 35%',
        'Implemented transaction management for payment systems',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  const alternateVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section ref={ref} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
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
            Career Path
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mt-2 text-white">
            Experience Timeline
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-transparent" />

          {/* Timeline items */}
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="mb-12 md:mb-16"
              variants={index % 2 === 0 ? itemVariants : alternateVariants}
            >
              <div className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Left side - Content */}
                <div className={`${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <motion.div
                    className="glass p-6 sm:p-8 rounded-lg border border-cyan-500/20"
                    whileHover={{
                      borderColor: 'rgba(34, 211, 238, 0.5)',
                      boxShadow: '0 0 30px rgba(34, 211, 238, 0.2)',
                    }}
                  >
                    {/* Year Badge */}
                    <div className="inline-block mb-4">
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {item.year}
                      </span>
                    </div>

                    {/* Role and Company */}
                    <h3 className="text-2xl font-bold text-white mb-2">{item.role}</h3>
                    <p className="text-cyan-400 font-semibold mb-4">{item.company}</p>

                    {/* Description */}
                    <p className="text-gray-400 font-light mb-4 leading-relaxed">{item.description}</p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-300 font-light"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="text-cyan-400 mt-1">✓</span>
                          <span>{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 rounded-full bg-cyan-400 border-4 border-background relative z-10"
                    whileHover={{
                      scale: 1.5,
                      boxShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
                    }}
                  />
                </div>

                {/* Mobile timeline dot */}
                <div className="md:hidden flex items-start gap-4">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border-4 border-background mt-2 flex-shrink-0" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background accents */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </section>
  )
}
