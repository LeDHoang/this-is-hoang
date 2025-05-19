"use client";
import { Hero } from "@/components/sections/hero"
import { Bio } from "@/components/sections/bio"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Blog } from "@/components/sections/blog"
import { QA } from "@/components/sections/qa"
import { Contact } from "@/components/sections/contact"
import { BuyACoffee } from "@/components/sections/buy-a-coffee"
import { BottomDock } from "@/components/sections/dock"
import dynamic from "next/dynamic"
import { ExpandableChatDemo } from "@/components/ui/expandable-chat-demo"
import type { MapProps } from "@/components/ui/world-map"
const WorldMap = dynamic<MapProps>(
  () => import("@/components/ui/world-map").then((mod) => mod.WorldMap),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 space-y-16">
          <Hero />
          <Bio />
          <WorldMap
            dots={[
              { start: { lat: 18.6796, lng: 105.6818 }, end: { lat: 21.0278, lng: 105.8342 } },  // Vinh → Hanoi
              { start: { lat: 21.0278, lng: 105.8342 }, end: { lat: 22.3193, lng: 114.1694 } },  // Hanoi → Hong Kong
              { start: { lat: 22.3193, lng: 114.1694 }, end: { lat: 29.6516, lng: -82.3248 } },  // Hong Kong → Gainesville
            ]}
          />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <Blog />
          <QA />
          <Contact />
          <BuyACoffee />
        </div>
      </main>
      <BottomDock />
      <ExpandableChatDemo />
    </>
  )
}
