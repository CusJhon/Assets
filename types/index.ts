export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  metadata?: {
    request_id: string
    processing_time: string
  }
}

export interface ApiCardProps {
  id: string
  name: string
  description: string
  endpoint: string
  method: 'GET' | 'POST'
  icon: string
  tags: string[]
  status: 'online' | 'beta' | 'deprecated'
  onTry?: () => void
}

export interface StatsCardProps {
  label: string
  value: string
  icon: string
  trend?: number
}

export interface NavItem {
  name: string
  href: string
  icon: string
}

export interface ToolParameter {
  name: string
  type: string
  required: boolean
  placeholder?: string
}