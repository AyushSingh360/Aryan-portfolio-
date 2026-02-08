'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { SpotlightCard } from './ui/spotlight-card'
import { ExternalLink, Github } from 'lucide-react'

export function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const projects = [
    {
      title: 'QuickClinic - Healthcare Suite',
      description:
        'Full-stack microservices-based hospital management system with real-time notifications and role-based dashboards.',
      stack: ['Spring Boot', 'Kafka', 'React', 'JWT', 'Docker', 'MySQL', 'Redis'],
      highlights: [
        'Secure inter-service communication with JWT',
        'Real-time email notifications via Kafka',
        'Role-based access control & dashboards',
        'Containerized microservices architecture',
      ],
      featured: true,
    },
    {
      title: 'LocalConnect',
      description: 'Location-based service marketplace with advanced filtering and async event handling.',
      stack: ['Spring Boot', 'MongoDB', 'Redis', 'Kafka', 'React'],
      highlights: [
        'OTP authentication system',
        'Redis-based caching strategy',
        'Asynchronous event processing',
        'Rating-based filtering algorithm',
      ],
    },
    {
      title: 'JournalApp',
      description: 'Role-based journal management system with sentiment analysis and cache optimization.',
      stack: ['Spring Boot', 'MongoDB Atlas', 'Redis', 'Java'],
      highlights: [
        'Sentiment analysis scheduler',
        'Multi-level caching strategy',
        'Modular service architecture',
        'Real-time data sync',
      ],
    },
    {
      title: 'Book Store API',
      description: 'RESTful API with AI-enhanced search capabilities and secure authentication.',
      stack: ['Spring Boot', 'MongoDB Atlas', 'Gemini API', 'JWT'],
      highlights: [
        'Secure authentication & authorization',
        'AI-powered book search integration',
        'Scalable REST architecture',
        'Transaction management',
      ],
    },
    {
      title: 'Express Book',
      description: 'Train reservation system with transactional database handling and lifecycle management.',
      stack: ['Java', 'JDBC', 'MySQL'],
      highlights: [
        'Complex transaction handling',
        'Reservation lifecycle management',
        'Database connection pooling',
        'Concurrent user support',
      ],
    },
    {
      title: 'Hire Hub',
      description: 'Worker-finder management platform connecting service providers with clients.',
      stack: ['Java', 'JDBC', 'MySQL', 'Spring Boot'],
      highlights: [
        'User matching algorithm',
        'Service provider ratings',
        'Booking management system',
        'Payment integration ready',
      ],
    },
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
    <section ref={ref} id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span
            variants={itemVariants}
            className="text-cyan-400 text-sm font-semibold uppercase tracking-widest"
          >
            Featured Work
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mt-2 text-white">
            Projects & Case Studies
          </motion.h2>
        </motion.div>

        {/* Aligned Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="h-full"
            >
              <SpotlightCard
                spotlightColor="#22d3ee30"
                className="h-full flex flex-col p-6"
              >
                <div className="flex-1 flex flex-col gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-widest">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-xs rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-xs font-semibold text-purple-400 mb-2 uppercase tracking-widest">
                        Highlights
                      </p>
                      <ul className="space-y-1">
                        {project.highlights.map((highlight, i) => (
                          <li
                            key={i}
                            className="text-xs text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-cyan-400 mt-1">▪</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <button className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/30 transition-colors flex items-center justify-center gap-2">
                      <ExternalLink size={16} />
                      Live
                    </button>
                    <button className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-400/30 transition-colors flex items-center justify-center gap-2">
                      <Github size={16} />
                      Code
                    </button>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background accents */}
      <motion.div
        className="absolute top-1/4 left-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
    </section>
  )
}
