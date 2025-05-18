import React from 'react'

export interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show the prompt symbol */
  showPrompt?: boolean
  /** Title to display in the terminal header */
  title?: string
  /** Content to render inside the terminal */
  children: React.ReactNode
}

export default function Terminal({
  children,
  className = '',
  showPrompt = true,
  title = 'terminal',
  ...props
}: TerminalProps) {
  return (
    <div className={`terminal-window ${className}`} {...props}>
      <div className="terminal-header">
        <div className="terminal-button terminal-button-red" />
        <div className="terminal-button terminal-button-yellow" />
        <div className="terminal-button terminal-button-green" />
        <div className="terminal-title">{title}</div>
      </div>
      <div className="terminal-content">
        {showPrompt && <span className="text-primary">$ </span>}
        {children}
      </div>
    </div>
  )
} 