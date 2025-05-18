import React, { useEffect, useRef } from 'react'

export interface TypingTextProps {
  text: string
  typingSpeed?: number
  className?: string
  onComplete?: () => void
}

export function TypingText({
  text,
  typingSpeed = 30,
  className = '',
  onComplete,
}: TypingTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = textRef.current
    if (!node) return
    node.textContent = ''
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        node.textContent += text[currentIndex]
        currentIndex++
      } else {
        clearInterval(interval)
        if (onComplete) onComplete()
      }
    }, typingSpeed)
    return () => clearInterval(interval)
  }, [text, typingSpeed, onComplete])

  return (
    <span className={className}>
      <span ref={textRef} />
      <span ref={cursorRef} className="terminal-cursor" />
    </span>
  )
} 