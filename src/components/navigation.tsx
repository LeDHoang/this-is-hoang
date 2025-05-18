"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = [
    { label: "home", href: "#home" },
    { label: "project", href: "#projects" },
    { label: "experience", href: "#experience" },
    { label: "blog", href: "#blog" },
  ]

  return (
    <header className="backdrop-blur-sm sticky top-0 z-50 bg-background/70">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between w-full">
          {/* Brand */}
          <a
            href="#home"
            className="text-2xl font-bold text-white glitch leading-none select-none"
            data-text="THIS-IS-HOANG"
          >
            THIS-IS-HOANG
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen((p) => !p)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="command-prompt text-white hover:text-[#00ff8c] text-[1.2rem] transition-colors duration-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm pt-[10px] pb-[10px]">
          <ul className="flex flex-col space-y-4 px-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block command-prompt text-white hover:text-[#00ff8c] text-[1.2rem] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
} 