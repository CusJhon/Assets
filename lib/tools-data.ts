import { ReactNode } from 'react'

export interface Tool {
  id: string
  name: string
  description: string
  endpoint: string
  method: 'GET' | 'POST'
  icon: string
  tags: string[]
  status: 'online' | 'beta' | 'deprecated'
  parameters: Array<{ name: string; type: string; required: boolean; placeholder?: string }>
  exampleResponse: any
}

export const toolsData: Tool[] = [
  {
    id: 'fake-gopay',
    name: 'Fake GoPay',
    description: 'Generate fake GoPay balance image with customizable amount, coins, and usage period',
    endpoint: '/api/fake-gopay',
    method: 'GET',
    icon: 'Wallet',
    tags: ['payment', 'e-wallet', 'balance'],
    status: 'online',
    parameters: [
      { name: 'saldo', type: 'number', required: true, placeholder: '500000' },
      { name: 'koin', type: 'number', required: false, placeholder: '159' },
      { name: 'bulan', type: 'string', required: false, placeholder: 'Mei' },
      { name: 'terpakai', type: 'number', required: false, placeholder: '0' },
    ],
    exampleResponse: {
      success: true,
      data: {
        url: 'https://api.example.com/generated/gopay_500000.jpg',
        expires: '2024-12-31T23:59:59Z',
      },
      metadata: {
        request_id: 'req_abc123',
        processing_time: '0.45s',
      },
    },
  },
  {
    id: 'fake-dana',
    name: 'Fake Dana',
    description: 'Generate fake DANA balance image with custom nominal value',
    endpoint: '/api/fake-dana',
    method: 'GET',
    icon: 'CreditCard',
    tags: ['payment', 'e-wallet', 'balance'],
    status: 'online',
    parameters: [
      { name: 'saldo', type: 'number', required: true, placeholder: '150000' },
    ],
    exampleResponse: {
      success: true,
      data: {
        url: 'https://api.example.com/generated/dana_150000.png',
        expires: '2024-12-31T23:59:59Z',
      },
      metadata: {
        request_id: 'req_abc123',
        processing_time: '0.38s',
      },
    },
  },
  {
    id: 'fake-call',
    name: 'Fake Call',
    description: 'Generate fake incoming call screen image with custom contact name and duration',
    endpoint: '/api/fake-call',
    method: 'GET',
    icon: 'Phone',
    tags: ['communication', 'call', 'screen'],
    status: 'online',
    parameters: [
      { name: 'name', type: 'string', required: false, placeholder: 'Ditzzx' },
      { name: 'duration', type: 'string', required: false, placeholder: '19.45' },
      { name: 'avatar', type: 'url', required: false, placeholder: 'https://example.com/avatar.jpg' },
    ],
    exampleResponse: {
      success: true,
      data: {
        url: 'https://api.example.com/generated/call_Ditzzx.png',
        expires: '2024-12-31T23:59:59Z',
      },
      metadata: {
        request_id: 'req_abc123',
        processing_time: '0.52s',
      },
    },
  },
  {
    id: 'fake-ig',
    name: 'Fake Instagram',
    description: 'Generate fake Instagram story image with custom text highlighting (use [text] for red color)',
    endpoint: '/api/fake-ig',
    method: 'GET',
    icon: 'Instagram',
    tags: ['social', 'instagram', 'story'],
    status: 'online',
    parameters: [
      { name: 'text', type: 'string', required: true, placeholder: 'Hello [World]' },
      { name: 'name', type: 'string', required: false, placeholder: 'Someone' },
      { name: 'avatar', type: 'url', required: false, placeholder: 'https://example.com/avatar.jpg' },
    ],
    exampleResponse: {
      success: true,
      data: {
        url: 'https://api.example.com/generated/igstory.png',
        expires: '2024-12-31T23:59:59Z',
      },
      metadata: {
        request_id: 'req_abc123',
        processing_time: '0.61s',
      },
    },
  },
  {
    id: 'quote-nokia',
    name: 'Quote Nokia',
    description: 'Generate vintage Nokia-style quote image with classic monochrome aesthetic',
    endpoint: '/api/quote-nokia',
    method: 'GET',
    icon: 'Quote',
    tags: ['quote', 'vintage', 'nokia', 'retro'],
    status: 'online',
    parameters: [
      { name: 'text', type: 'string', required: true, placeholder: 'Your inspirational quote here...' },
      { name: 'sender', type: 'string', required: false, placeholder: 'Jhon' },
    ],
    exampleResponse: {
      success: true,
      data: {
        url: 'https://api.example.com/generated/nokia_quote.png',
        expires: '2024-12-31T23:59:59Z',
      },
      metadata: {
        request_id: 'req_abc123',
        processing_time: '0.43s',
      },
    },
  },
  {
    id: 'reminder',
    name: 'Reminder',
    description: 'Generate elegant reminder image with beautiful typography and highlighted text using [brackets]',
    endpoint: '/api/reminder',
    method: 'GET',
    icon: 'Bell',
    tags: ['productivity', 'reminder', 'note', 'typography'],
    status: 'beta',
    parameters: [
      { name: 'text', type: 'string', required: true, placeholder: '[Meeting] at 3PM tomorrow' },
      { name: 'author', type: 'string', required: false, placeholder: 'Someone' },
    ],
    exampleResponse: {
      success: true,
      data: {
        url: 'https://api.example.com/generated/reminder.jpg',
        expires: '2024-12-31T23:59:59Z',
      },
      metadata: {
        request_id: 'req_abc123',
        processing_time: '0.47s',
      },
    },
  },
]

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'payment', label: 'Payment' },
  { value: 'e-wallet', label: 'E-Wallet' },
  { value: 'social', label: 'Social Media' },
  { value: 'quote', label: 'Quotes' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'retro', label: 'Retro' },
]