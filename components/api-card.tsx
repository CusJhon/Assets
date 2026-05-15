'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Play, Check, ExternalLink, Tag, Clock, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardBody } from '@/components/ui/card'
import { Tool } from '@/lib/tools-data'
import * as Icons from 'lucide-react'

// Map icon strings to actual components
const iconMap: Record<string, any> = {
  Wallet: Icons.Wallet,
  CreditCard: Icons.CreditCard,
  Phone: Icons.Phone,
  Instagram: Icons.Instagram,
  Quote: Icons.Quote,
  Bell: Icons.Bell,
}

interface ApiCardProps extends Tool {}

export function ApiCard({ id, name, description, endpoint, method, icon, tags, status, parameters }: ApiCardProps) {
  const [copied, setCopied] = useState(false)
  const IconComponent = iconMap[icon] || Icons.Zap

  const handleCopy = async () => {
    const fullUrl = `${window.location.origin}${endpoint}`
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    toast.success('Endpoint copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const statusColors = {
    online: 'text-green-500 bg-green-500/10 border-green-500/20',
    beta: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    deprecated: 'text-red-500 bg-red-500/10 border-red-500/20',
  }

  const statusLabels = {
    online: 'Online',
    beta: 'Beta',
    deprecated: 'Deprecated',
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:neon-glow transition-all duration-300">
        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[status]}`}>
                    {statusLabels[status]}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>~0.5s response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-4 line-clamp-2 text-sm leading-relaxed">{description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-lg bg-white/5 text-xs text-gray-400 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>

          {/* Endpoint */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-black/50 border border-white/10 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {method}
              </span>
              <code className="text-sm font-mono text-gray-300 truncate">{endpoint}</code>
            </div>
            <div className="flex items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Copy endpoint"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="View documentation"
              >
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Try Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Play className="w-4 h-4" />
            Try in Playground
          </motion.button>
        </CardBody>
      </Card>
    </motion.div>
  )
}