import { cn } from "@/lib/utils"
import { ElementType, ComponentPropsWithoutRef } from "react"

interface StarBorderProps<T extends ElementType> {
  as?: T
  color?: string
  speed?: string
  className?: string
  children: React.ReactNode
}

export function StarBorder<T extends ElementType = "div">({
  as,
  className,
  color,
  speed = "6s",
  children,
  ...props
}: StarBorderProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof StarBorderProps<T>>) {
  const Component = as || "div"
  const defaultColor = color || "hsl(var(--primary))"

  return (
    <Component 
      className={cn(
        "relative inline-block py-6 px-1 overflow-hidden rounded-[20px] w-full",
        className
      )} 
      {...props}
    >
      <div
        className={cn(
          "absolute w-[300%] h-[50%] bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0",
          "opacity-50 dark:opacity-80" 
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 8%)`,
          backgroundSize: "20px 20px",
          animationDuration: speed,
        }}
      />
      <div
        className={cn(
          "absolute w-[300%] h-[50%] top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0",
          "opacity-50 dark:opacity-80"
        )}
        style={{
          background: `radial-gradient(circle, ${defaultColor}, transparent 8%)`,
          backgroundSize: "20px 20px",
          animationDuration: speed,
        }}
      />
      <div className={cn(
        "relative z-1 border text-foreground rounded-[20px] w-full",
        "bg-gradient-to-b from-background/80 to-background/80 border-border/80",
        "dark:from-background/80 dark:to-background/80 dark:border-border/80",
        "p-[52px]"
      )}>
        {children}
      </div>
    </Component>
  )
} 