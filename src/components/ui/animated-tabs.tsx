"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedTabsProps {
  tabs: string[]
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

export function AnimatedTabs({ tabs, activeTab, onTabChange, className }: AnimatedTabsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoverStyle, setHoverStyle] = useState({})
  const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
  const tabRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const index = tabs.indexOf(activeTab)
    if (index !== -1) {
      setActiveIndex(index)
    }
  }, [activeTab, tabs])

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetWidth } = hoveredElement
        setHoverStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    }
  }, [hoveredIndex])

  useEffect(() => {
    const activeElement = tabRefs.current[activeIndex]
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement
      setActiveStyle({
        left: `${offsetLeft}px`,
        width: `${offsetWidth}px`,
      })
    }
  }, [activeIndex])

  useEffect(() => {
    requestAnimationFrame(() => {
      const activeElement = tabRefs.current[activeIndex]
      if (activeElement) {
        const { offsetLeft, offsetWidth } = activeElement
        setActiveStyle({
          left: `${offsetLeft}px`,
          width: `${offsetWidth}px`,
        })
      }
    })
  }, [activeIndex])

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        {/* Hover Highlight */}
        <div
          className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] dark:bg-[#ffffff1a] rounded-[6px] flex items-center"
          style={{
            ...hoverStyle,
            opacity: hoveredIndex !== null ? 1 : 0,
          }}
        />

        {/* Active Indicator */}
        <div
          className="absolute bottom-0 h-[2px] bg-[#00ff8c] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(0,255,140,0.5)] z-20"
          style={activeStyle}
        />

        {/* Tabs */}
        <div className="relative flex space-x-[6px] items-center">
          {tabs.map((tab, index) => (
            <div
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el
                return
              }}
              className={cn(
                "px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] flex items-center justify-center",
                index === activeIndex 
                  ? "text-foreground" 
                  : "text-muted-foreground"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onTabChange(tab)}
            >
              <div className="text-sm font-medium leading-5 whitespace-nowrap">
                {tab}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

