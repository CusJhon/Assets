'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, Zap, Activity, Users, Code, Server, Cloud } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { label: 'Total Endpoints', value: '6+', icon: Code, color: 'cyan' },
  { label: 'API Status', value: 'Online', icon: Shield, color: 'green' },
  { label: 'Daily Requests', value: '150K+', icon: Activity, color: 'purple' },
  { label: 'Happy Users', value: '10K+', icon: Users, color: 'pink' },
]

const words = ['GoPay', 'Dana', 'Call', 'Instagram', 'Nokia', 'Reminder']

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    const fullText = words[currentWord]
    
    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false)
        setCurrentWord((prev) => (prev + 1) % words.length)
        timeout = setTimeout(() => {}, 500)
      } else {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1))
        }, 50)
      }
    } else {
      if (text.length === fullText.length) {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 2000)
      } else {
        timeout = setTimeout(() => {
          setText(fullText.slice(0, text.length + 1))
        }, 100)
      }
    }
    
    return () => clearTimeout(timeout)
  }, [text, isDeleting, currentWord])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                y: [null, -50, 50, -50],
                x: [null, 50, -50, 50],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center px-4 py-2 rounded-full glass mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
            <span className="text-sm">API Status: Operational</span>
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Generate{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {text}
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-1 h-12 ml-1 bg-cyan-400"
              />
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Professional API platform for generating fake images for GoPay, Dana, Instagram, and more. 
            Fast, reliable, and easy to integrate with your applications.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="group">
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              <Server className="w-5 h-5" />
              View Documentation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 text-${stat.color}-400`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>

          {/* Integration Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-4"
          >
            <span className="text-sm text-gray-500">Trusted by developers using:</span>
            <div className="flex gap-3">
              {['Node.js', 'Python', 'PHP', 'Java', 'Go'].map((lang) => (
                <span key={lang} className="px-3 py-1 rounded-full glass text-xs">
                  {lang}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center">
          <div className="w-1 h-3 rounded-full bg-cyan-400 mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}