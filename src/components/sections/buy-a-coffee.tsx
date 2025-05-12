"use client"

import dynamic from "next/dynamic"
const MagicCardDemo = dynamic(
  () => import("@/components/ui/magic-card-demo").then((mod) => mod.MagicCardDemo),
  { ssr: false, loading: () => null }
)
// import { PaymentInputsDemo } from "@/components/ui/payment-inputs-demo"

export function BuyACoffee() {
  return (
    <section className="w-full py-4">
      <h2 className="text-2xl font-bold mb-6">Buy A Coffee</h2>
      <MagicCardDemo />
    </section>
  )
} 