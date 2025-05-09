"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 opacity-50">
        <Sun className="h-5 w-5 text-yellow-400" />
        <div className="h-6 w-11 rounded-full bg-muted" />
        <Moon className="h-5 w-5 text-blue-500" />
      </div>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme
  const isCustom = currentTheme === "custom"
  const isDark = currentTheme === "dark" || (isCustom && document.documentElement.classList.contains("dark"))

  const handleToggle = (checked: boolean) => {
    if (isCustom) {
      if (checked) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } else {
      setTheme(checked ? "dark" : "light")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Sun
        onClick={() => isCustom ? handleToggle(false) : setTheme("light")}
        className={
          `h-5 w-5 cursor-pointer transition-colors ${!isDark ? "text-yellow-400" : "text-muted-foreground"}`
        }
      />
      <Switch
        checked={isDark}
        onCheckedChange={handleToggle}
        aria-label="Toggle theme"
        className="data-[state=checked]:bg-primary"
      />
      <Moon
        onClick={() => isCustom ? handleToggle(true) : setTheme("dark")}
        className={`h-5 w-5 cursor-pointer transition-colors ${isDark ? "text-blue-500" : "text-muted-foreground"}`}
      />
    </div>
  )
} 