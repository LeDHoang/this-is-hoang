import { cn } from "@/lib/utils"
import { StarBorder } from "@/components/ui/star-border"
import React from "react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function StarBorderDemo() {
  return (
    <div className="space-y-8">
      <StarBorder>
        Theme-aware Border
      </StarBorder>
    </div>
  )
}

function DefaultToggle() {
  return (
    <div className="space-y-2 text-center">
      <div className="flex justify-center">
        <ThemeToggle />
      </div>
    </div>
  )
}

export { DefaultToggle }