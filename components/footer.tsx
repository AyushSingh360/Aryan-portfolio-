'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/aryan735',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aryanraj-tech/',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'aryanraj.dev.net@gmail.com',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <footer className="border-t border-cyan-500/10 bg-background/50 backdrop-blur-sm py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
              {'<Backend />'}
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              Crafting scalable backend systems and production-grade microservices with precision and excellence.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-light">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 glass rounded-lg text-gray-400 hover:text-cyan-400 transition-all border border-cyan-500/20 hover:border-cyan-400"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="border-t border-cyan-500/10 mb-8" />

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <p className="text-gray-500 text-sm font-light">
            © {currentYear} Backend Engineer Portfolio. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm font-light">
            Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </motion.div>
    </footer>
  )
}
