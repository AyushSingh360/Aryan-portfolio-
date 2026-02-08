'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ProjectCard } from './project-card'

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

        {/* Magic Bento Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={project.featured ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
            >
              <ProjectCard {...project} />
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
