'use client'

import { HeroSection } from '@/components/sections/hero-section'
import { ToolsSection } from '@/components/sections/tools-section'
import { Playground } from '@/components/sections/playground'
import { DocsSection } from '@/components/sections/docs-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <Playground />
      <DocsSection />
    </>
  )
}