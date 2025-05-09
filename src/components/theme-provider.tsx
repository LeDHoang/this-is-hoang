"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  React.useEffect(() => {
    // If theme is custom, add the custom class to the HTML element
    const theme = localStorage.getItem("hoang-theme")
    if (theme === '"custom"') {
      document.documentElement.classList.add("custom")
    }
  }, [])

  return (
    <NextThemesProvider
      themes={['light', 'dark', 'system', 'custom']}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
