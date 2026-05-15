// app/layout.tsx (update dengan Sidebar)
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Sidebar } from '@/components/layout/sidebar'
import { Footer } from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'API Tools Hub | Professional API Generator Platform',
  description: 'Generate fake GoPay, Dana, Call, Instagram, Nokia Quote, and Reminder images with our professional REST API. Fast, reliable, and easy to use.',
  keywords: 'API, fake generator, GoPay, Dana, Instagram, image generator, REST API',
  authors: [{ name: 'API Tools Hub' }],
  openGraph: {
    title: 'API Tools Hub - Professional API Generator Platform',
    description: 'Generate fake images for GoPay, Dana, Instagram, and more with our REST API',
    type: 'website',
    locale: 'en_US',
    siteName: 'API Tools Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Tools Hub',
    description: 'Professional API Generator Platform',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 lg:ml-[280px] min-h-screen pt-16 pb-20 md:pb-0 transition-all duration-300">
              {children}
            </main>
          </div>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  )
}