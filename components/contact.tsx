'use client'

import React from "react"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in all fields')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    // Message length validation
    if (formData.message.length < 10) {
      setErrorMessage('Message must be at least 10 characters long')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        const data = await response.json()
        setErrorMessage(data.message || 'Failed to send message. Please try again.')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 4000)
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section ref={ref} id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
            Get In Touch
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold mt-2 text-white">
            Let's Work Together
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg mt-4 font-light"
          >
            Have a project in mind or want to discuss backend architecture? I'd love to hear from you.
          </motion.p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="glass p-8 sm:p-10 rounded-lg border border-cyan-500/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                Your Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-background/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-light"
                whileFocus={{
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
                }}
                disabled={status === 'loading'}
              />
            </motion.div>

            {/* Email Input */}
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-background/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-light"
                whileFocus={{
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
                }}
                disabled={status === 'loading'}
              />
            </motion.div>

            {/* Message Textarea */}
            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or ask any questions..."
                rows={5}
                className="w-full px-4 py-3 bg-background/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all font-light resize-none"
                whileFocus={{
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.2)',
                }}
                disabled={status === 'loading'}
              />
            </motion.div>

            {/* Status Messages */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: status !== 'idle' ? 1 : 0, y: status !== 'idle' ? 0 : -10 }}
              transition={{ duration: 0.3 }}
              className="h-10"
            >
              {status === 'success' && (
                <div className="flex items-center gap-2 text-green-400 text-sm font-light">
                  <CheckCircle2 className="w-5 h-5" />
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm font-light">
                  <AlertCircle className="w-5 h-5" />
                  {errorMessage}
                </div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold transition-all glow-cyan disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              whileHover={status !== 'loading' && status !== 'success' ? { scale: 1.02 } : {}}
              whileTap={status !== 'loading' && status !== 'success' ? { scale: 0.98 } : {}}
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Sent!
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>

          {/* Additional contact info */}
          <motion.div
            variants={itemVariants}
            className="mt-8 pt-8 border-t border-cyan-500/20 flex flex-col sm:flex-row gap-6 sm:gap-12"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Email</p>
              <a href="mailto:aryanraj.tech@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors font-light">
                aryanraj.tech@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">LinkedIn</p>
              <a href="https://www.linkedin.com/in/aryanraj-tech/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-light">
                linkedin.com/in/aryanraj-tech
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">GitHub</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors font-light">
                github.com/aryanraj
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background accent */}
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </section>
  )
}
