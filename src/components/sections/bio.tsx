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
  const { setTheme, theme } = useTheme()

  const handleThemeChange = (newTheme: string) => {
    if (newTheme === "custom") {
      document.documentElement.classList.add("custom")
      // If it was in dark mode before, keep it dark
      if (document.documentElement.classList.contains("dark")) {
        setTheme("custom")
      } else {
        setTheme("custom")
        document.documentElement.classList.remove("dark")
      }
    } else {
      document.documentElement.classList.remove("custom")
      setTheme(newTheme)
    }
  }

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
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")}>
          System
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("custom")}>
          Custom
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Bio() {
  return (
    <section className="flex flex-col items-center space-y-6">
      <div className="flex items-start gap-8 max-w-3xl">
        <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/profile.jpg"
            alt="Hoang Le"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4 text-left">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Hoang Le</h1>
            <p className="text-xl text-muted-foreground">
              Machine Learning Engineer & Full Stack Developer
            </p>
            <p className="text-muted-foreground">Gainesville, FL</p>
          </div>
          <p className="text-muted-foreground">
          Motivated Computer Science student with hands-on experience in Machine Learning, NLP, and Generative AI, specializing in building innovative, production-ready solutions. 
          </p>
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
        </div>
      </div>
    </section>
  )
} 