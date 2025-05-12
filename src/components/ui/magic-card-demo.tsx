"use client"

import { useTheme } from "next-themes"
import { MagicCard } from "@/components/ui/magic-card"
import { CreditCard } from "@/components/ui/credit-card"
import { PaymentInputsDemo } from "@/components/ui/payment-inputs-demo"

export function MagicCardDemo() {
  const { theme } = useTheme()
  return (
    <div className="flex h-[500px] w-full flex-col gap-4 lg:h-[250px] lg:flex-row">
      <MagicCard
        className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="relative z-20">
            <CreditCard
              cardNumber="4111 1111 1111 9743"
              cardHolder="John Doe"
              expiryDate="12/24"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl whitespace-nowrap">Magic</span>
          </div>
        </div>
      </MagicCard>
      <MagicCard
        className="cursor-pointer flex items-center justify-center shadow-2xl p-4"
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full">
            <PaymentInputsDemo />
          </div>
        </div>
      </MagicCard>
    </div>
  )
} 