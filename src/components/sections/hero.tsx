"use client"

import { TextParticle } from "@/components/ui/text-particle"
import { useTheme } from "next-themes"

export function Hero() {
  const { theme } = useTheme()
  
  // Use theme-appropriate colors (dark text on light background, light text on dark background)
  const particleColor = theme === "dark" ? "#ffffff" : "#000000"

  return (
    <section id="home" className="w-full mb-8">
      <div className="w-full">
        <div className="w-1/2 md:w-3/4 mx-auto h-64 sm:h-96">
          <TextParticle
            text="Hoang"
            fontSize={120}
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