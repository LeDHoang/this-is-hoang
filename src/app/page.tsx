"use client";
import { Hero } from "@/components/sections/hero"
import { Bio } from "@/components/sections/bio"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Contact } from "@/components/sections/contact"
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
              { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
              { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
              { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
              { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
              { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
              { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
            ]}
          />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <Contact />
        </div>
      </main>
      <BottomDock />
      <ExpandableChatDemo />
    </>
  )
}
