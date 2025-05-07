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
        <a 
          href="https://github.com/LeDHoang" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/hoangleduc/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          LinkedIn
        </a>
        <ThemeToggle />
      </div>
      <p className="max-w-2xl text-muted-foreground">
        I specialize in building intelligent systems and web applications, combining expertise in
        machine learning, data science, and full-stack development to create impactful solutions.
      </p>
    </section>
  )
} 