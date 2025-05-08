"use client"

import Image from "next/image"
import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-50 bg-background">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
        <ModeToggle />
      </div>
      <p className="max-w-2xl text-muted-foreground">
        I specialize in building intelligent systems and web applications, combining expertise in
        machine learning, data science, and full-stack development to create impactful solutions.
      </p>
    </section>
  )
} 