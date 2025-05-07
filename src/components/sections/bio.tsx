"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Bio() {
  return (
    <section className="flex flex-col items-center text-center space-y-6">
      <div className="relative w-32 h-32 rounded-full overflow-hidden">
        <Image
          src="/profile.jpg"
          alt="Hoang Le"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Hoang Le</h1>
        <p className="text-xl text-muted-foreground">
          Machine Learning Engineer & Full Stack Developer
        </p>
        <p className="text-muted-foreground">San Francisco, CA</p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" asChild onClick={(e) => e.preventDefault()}>
          <a href="https://github.com/LeDHoang" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            GitHub
          </a>
        </Button>
        <Button variant="outline" asChild onClick={(e) => e.preventDefault()}>
          <a href="https://www.linkedin.com/in/hoangleduc/" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            LinkedIn
          </a>
        </Button>
        <ThemeToggle />
      </div>
      <p className="max-w-2xl text-muted-foreground">
        I specialize in building intelligent systems and web applications, combining expertise in
        machine learning, data science, and full-stack development to create impactful solutions.
      </p>
    </section>
  )
} 