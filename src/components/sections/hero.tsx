"use client"

import dynamic from "next/dynamic"
const TextParticle = dynamic(
  () => import("@/components/ui/text-particle").then((mod) => mod.TextParticle),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted rounded-lg animate-pulse" />,
  }
)
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function Hero() {
  const { theme } = useTheme()
  const [fontSize, setFontSize] = useState(120)
  
  // Use theme-appropriate colors (dark text on light background, light text on dark background)
  const particleColor = theme === "dark" ? "#ffffff" : "#000000"

  // Make fontSize responsive based on screen size
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setFontSize(80)
      } else if (window.innerWidth < 768) { // md breakpoint
        setFontSize(100)
      } else {
        setFontSize(120)
      }
    }

    updateFontSize()
    window.addEventListener('resize', updateFontSize)
    
    return () => window.removeEventListener('resize', updateFontSize)
  }, [])

  return (
    <section id="home" className="w-full mb-8">
      <div className="w-full">
        <div className="w-full md:w-3/4 mx-auto h-64 sm:h-96">
          <TextParticle
            text="Hoang"
            fontSize={fontSize}
            particleColor={particleColor}
            particleSize={1.5}
            particleDensity={6}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
} 