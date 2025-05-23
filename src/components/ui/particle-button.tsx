"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { MousePointerClick } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

// Derive ButtonProps from the Button component
type ButtonProps = React.ComponentProps<typeof Button>;

interface ParticleButtonProps extends ButtonProps {
  successDuration?: number;
}

function SuccessParticles({ buttonRef }: { buttonRef: React.RefObject<HTMLButtonElement | null> }) {
  const { theme } = useTheme();
  const rect = buttonRef.current?.getBoundingClientRect();
  if (!rect) return null;

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  return (
    <AnimatePresence>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={cn("fixed w-1 h-1 rounded-full", theme === "dark" ? "bg-white" : "bg-black")}
          style={{ left: centerX, top: centerY }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: [0, (i % 2 ? 1 : -1) * (Math.random() * 50 + 20)],
            y: [0, -Math.random() * 50 - 20],
          }}
          transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
    </AnimatePresence>
  );
}

function ParticleButton({ children, successDuration = 1000, className, ...props }: ParticleButtonProps) {
  const [showParticles, setShowParticles] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setShowParticles(true);
    toast.success("Thanks for the coffee!!");
    setTimeout(() => setShowParticles(false), successDuration);
  };

  return (
    <>
      {showParticles && <SuccessParticles buttonRef={buttonRef} />}
      <Button
        ref={buttonRef}
        onClick={handleClick}
        className={cn(
          "relative",
          showParticles && "scale-95",
          "transition-transform duration-100",
          className
        )}
        {...props}
      >
        {children}
        <MousePointerClick className="h-4 w-4 ml-2" />
      </Button>
    </>
  );
}

ParticleButton.displayName = "ParticleButton";

export { ParticleButton }; 