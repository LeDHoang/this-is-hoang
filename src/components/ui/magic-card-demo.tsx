"use client"

import { useTheme } from "next-themes"
import { MagicCard } from "@/components/ui/magic-card"
import { CreditCard } from "@/components/ui/credit-card"
import { PaymentInputsDemo } from "@/components/ui/payment-inputs-demo"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useId, useState } from "react"
import { Input } from "@/components/ui/input"
import { ParticleButton } from "@/components/ui/particle-button"
import { OnboardingStep } from "@/components/ui/onboarding-step"

export function MagicCardDemo() {
  const { theme } = useTheme()
  const id = useId()
  const [percent, setPercent] = useState<string>("15")
  const [customInput, setCustomInput] = useState<string>(percent)
  const [customPercent, setCustomPercent] = useState<number>(Number(percent))
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleNextOnboarding = () => {
    console.log("Onboarding next clicked")
    setIsDialogOpen(false)
  }

  return (
    <>
      <div className="w-full grid gap-4 lg:grid-cols-2">
        <MagicCard
          className="cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl py-[5px] h-full"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="relative z-20">
              <CreditCard
                cardNumber="4111 1111 1111 9743"
                cardHolder="John Doe"
                expiryDate="12/24"
                variant={theme === 'dark' ? 'dark' : 'default'}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl whitespace-nowrap">Magic</span>
            </div>
          </div>
        </MagicCard>
        <MagicCard
          className="cursor-pointer flex items-center justify-center shadow-2xl p-2 sm:p-4 h-full"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-full">
              <PaymentInputsDemo />
            </div>
          </div>
          <div className="w-full mt-4 sm:mt-6">
            <RadioGroup className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full" defaultValue="mastercard">
              <div className="relative flex items-center gap-2 rounded border-2 border-[rgba(0,255,140,0.5)] p-3 sm:p-4 shadow-sm shadow-black/5 data-[state=checked]:border-[rgba(0,255,140,0.5)]">
                <RadioGroupItem value="mastercard" id={`${id}-mastercard`} className="order-1 after:absolute after:inset-0" />
                <div className="flex grow items-center gap-3">
                  <svg className="shrink-0" width={32} height={24} viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect width="32" height="24" rx="4" className="fill-muted" />
                    <path d="M19.0537 6.49742H12.9282V17.5026H19.0537V6.49742Z" fill="#FF5A00" />
                    <path d="M13.3359 12C13.3359 9.76408 14.3871 7.77961 16 6.49741C14.8129 5.56408 13.3155 5 11.6822 5C7.81295 5 4.68221 8.13074 4.68221 12C4.68221 15.8693 7.81295 19 11.6822 19C13.3155 19 14.8129 18.4359 16 17.5026C14.3848 16.2385 13.3359 14.2359 13.3359 12Z" fill="#EB001B" />
                    <path d="M27.3178 12C27.3178 15.8693 24.1871 19 20.3178 19C18.6845 19 17.1871 18.4359 16 17.5026C17.6333 16.2181 18.6641 14.2359 18.6641 12C18.6641 9.76408 17.6129 7.77961 16 6.49741C17.1848 5.56408 18.6822 5 20.3155 5C24.1871 5 27.3178 8.15113 27.3178 12Z" fill="#F79E1B" />
                  </svg>
                  <Label htmlFor={`${id}-mastercard`} className="text-sm">Mastercard</Label>
                </div>
              </div>
              <div className="relative flex items-center gap-2 rounded border-2 border-[rgba(0,255,140,0.5)] p-3 sm:p-4 shadow-sm shadow-black/5 data-[state=checked]:border-[rgba(0,255,140,0.5)]">
                <RadioGroupItem value="visa" id={`${id}-visa`} className="order-1 after:absolute after:inset-0" />
                <div className="flex grow items-center gap-3">
                  <svg className="shrink-0" width={32} height={24} viewBox="0 0 32 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <g clipPath="url(#vc-a)">
                      <path className="fill-muted" d="M28 0H4a4 4 0 0 0-4 4v16a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4Z" />
                      <path fill="#fff" d="m15.884 8.262-1.604 7.496h-1.94l1.604-7.496h1.94Z" />
                      <path fill="#fff" fillRule="evenodd" d="M26.207 15.758H28l-1.567-7.496H24.78a.882.882 0 0 0-.826.55l-2.91 6.946h2.037l.404-1.12h2.488l.235 1.12Zm-2.165-2.656 1.021-2.815.587 2.815h-1.608Z" clipRule="evenodd" />
                      <path fill="#fff" d="M21.144 13.31c.005-1.183-.975-1.698-1.76-2.11-.526-.276-.964-.506-.957-.861.007-.27.263-.555.823-.628.277-.036 1.044-.065 1.913.335l.34-1.59a5.23 5.23 0 0 0-1.815-.331c-1.917 0-3.265 1.018-3.276 2.477-.013 1.08.963 1.681 1.697 2.04.756.368 1.01.604 1.006.932-.005.503-.604.726-1.16.734-.945.015-1.506-.247-1.95-.454l-.042-.02-.352 1.643c.454.208 1.29.39 2.156.398 2.038 0 3.371-1.006 3.377-2.565ZM13.112 8.262 9.97 15.758H7.92L6.374 9.775c-.094-.368-.175-.503-.46-.658-.467-.253-1.237-.49-1.914-.638l.046-.217h3.3c.42 0 .798.28 .894.763l.817 4.338 2.018-5.101h2.037Z" />
                    </g>
                    <defs>
                      <clipPath id="vc-a">
                        <path fill="#fff" d="M0 0h32v24H0z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <Label htmlFor={`${id}-visa`} className="text-sm">Visa</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          <div className="w-full mt-4">
            <RadioGroup
              value={percent}
              onValueChange={(val) => {
                setPercent(val)
                if (val !== "custom") {
                  setCustomInput(val)
                  setCustomPercent(Number(val))
                }
              }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full"
            >
              <div className="relative flex items-center gap-2 rounded border-2 border-[rgba(0,255,140,0.5)] p-3 sm:p-4 shadow-sm shadow-black/5 data-[state=checked]:border-[rgba(0,255,140,0.5)]">
                <RadioGroupItem value="15" id={`${id}-15`} className="order-1 after:absolute after:inset-0" />
                <Label htmlFor={`${id}-15`} className="text-sm">15%</Label>
              </div>
              <div className="relative flex items-center gap-2 rounded border-2 border-[rgba(0,255,140,0.5)] p-3 sm:p-4 shadow-sm shadow-black/5 data-[state=checked]:border-[rgba(0,255,140,0.5)]">
                <RadioGroupItem value="20" id={`${id}-20`} className="order-1 after:absolute after:inset-0" />
                <Label htmlFor={`${id}-20`} className="text-sm">20%</Label>
              </div>
              <div className="relative flex items-center gap-2 rounded border-2 border-[rgba(0,255,140,0.5)] p-3 sm:p-4 shadow-sm shadow-black/5 data-[state=checked]:border-[rgba(0,255,140,0.5)]">
                <RadioGroupItem value="25" id={`${id}-25`} className="order-1 after:absolute after:inset-0" />
                <Label htmlFor={`${id}-25`} className="text-sm">25%</Label>
              </div>
              <div className="relative flex items-center gap-2 rounded border-2 border-[rgba(0,255,140,0.5)] p-3 sm:p-4 shadow-sm shadow-black/5 data-[state=checked]:border-[rgba(0,255,140,0.5)]">
                <RadioGroupItem value="30" id={`${id}-30`} className="order-1 after:absolute after:inset-0" />
                <Label htmlFor={`${id}-30`} className="text-sm">30%</Label>
              </div>
              <div className="relative flex items-center gap-2 rounded border-2 border-[rgba(0,255,140,0.5)] p-3 sm:p-4 shadow-sm shadow-black/5 data-[state=checked]:border-[rgba(0,255,140,0.5)] col-span-2 sm:col-span-1">
                <RadioGroupItem value="custom" id={`${id}-custom`} className="order-1 after:absolute after:inset-0" />
                <Label htmlFor={`${id}-custom`} className="text-sm">Custom</Label>
              </div>
            </RadioGroup>
          </div>
          {percent === "custom" && (
            <div className="w-full mt-4">
              <Input
                type="number"
                id={`${id}-custom-input`}
                min="0"
                className="w-full"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const num = Number(customInput)
                    if (!isNaN(num)) setCustomPercent(num)
                  }
                }}
                placeholder="Enter custom %"
              />
            </div>
          )}
          <div className="w-full mt-4 p-3 sm:p-4 rounded border-2 border-[rgba(0,255,140,0.5)] shadow-sm shadow-black/5">
            <div className="flex justify-between text-sm mb-2">
              <span>Coffee fee (Co-fee)</span>
              <span>{"$" + (10000).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-1">
              <span>Tip</span>
              <span>{"$" + (((percent === 'custom' ? customPercent : Number(percent)) / 100) * 10000).toLocaleString(undefined, {maximumFractionDigits:2})}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Tip = {percent === 'custom' ? customPercent : percent}% * {"$" + (10000).toLocaleString()}
            </p>
            <div className="flex justify-between font-medium mb-4">
              <span>Total</span>
              <span>{"$" + ((10000 + ((percent === 'custom' ? customPercent : Number(percent)) / 100) * 10000)).toLocaleString(undefined, {maximumFractionDigits:2})}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <ParticleButton
                successDuration={0}
                className="flex-1 bg-foreground text-background hover:bg-foreground/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90 border border-transparent text-xs sm:text-sm px-2 sm:px-4"
                onClick={() => setIsDialogOpen(true)}
              >
                Coffee?? What is that!
              </ParticleButton>
              <ParticleButton
                successDuration={1000}
                className="flex-1 bg-foreground text-background hover:bg-foreground/90 dark:bg-foreground dark:text-background dark:hover:bg-foreground/90 border border-transparent text-xs sm:text-sm px-2 sm:px-4"
              >
                Buy me a coffee
              </ParticleButton>
            </div>
          </div>
        </MagicCard>
      </div>
      <OnboardingStep
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        imageSrc="/footage/photo/109002.webp"
        title="Welcome to the hidden checkpoint"
        description="Take this zyn for a feeling 5 gums can't provide."
        currentStep={1}
        totalSteps={3}
        onNext={handleNextOnboarding}
      />
    </>
  )
} 