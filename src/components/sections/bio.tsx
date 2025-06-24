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
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import Terminal from "../ui/terminal"
import { TypingText } from "../ui/typing-text"

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
    <Terminal id="bio" className="w-full max-w-4xl mx-auto my-8" showPrompt={false}>
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 w-full">
          <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
            <Image
              src="/profile.jpg"
              alt="Hoang Le"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4 text-center md:text-left w-full">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">Hoang Le</h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Machine Learning Engineer & Full Stack Developer
              </p>
              <p className="text-muted-foreground">Gainesville, FL</p>
            </div>
            <p className="flex items-start text-muted-foreground">
              <span className="text-primary mr-2">$</span>
              <TypingText
                text="Motivated Computer Science student with hands-on experience in Machine Learning, NLP, and Generative AI, specializing in building innovative, production-ready solutions."
                typingSpeed={40}
              />
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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
              <ThemeToggle className="h-10" />
            </div>
            <TextShimmerWave
              className="[--base-color:#000000] [--base-gradient-color:#ffffff] dark:[--base-color:#ffffff] dark:[--base-gradient-color:#000000] text-secondary"
            >
              Creating perfect vibe....
            </TextShimmerWave>
          </div>
        </div>
      </div>
    </Terminal>
  )
} 