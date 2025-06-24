"use client";
import { Hero } from "@/components/sections/hero"
import { Bio } from "@/components/sections/bio"
import dynamic from "next/dynamic"
import { Suspense } from "react"

// Lazy load heavy components to improve initial loading performance
const Projects = dynamic(() => import("@/components/sections/projects").then(mod => ({ default: mod.Projects })), {
  ssr: true,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const Experience = dynamic(() => import("@/components/sections/experience").then(mod => ({ default: mod.Experience })), {
  ssr: true,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const Education = dynamic(() => import("@/components/sections/education").then(mod => ({ default: mod.Education })), {
  ssr: true,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const Skills = dynamic(() => import("@/components/sections/skills").then(mod => ({ default: mod.Skills })), {
  ssr: true,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const Blog = dynamic(() => import("@/components/sections/blog").then(mod => ({ default: mod.Blog })), {
  ssr: true,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const QA = dynamic(() => import("@/components/sections/qa").then(mod => ({ default: mod.QA })), {
  ssr: true,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const Contact = dynamic(() => import("@/components/sections/contact").then(mod => ({ default: mod.Contact })), {
  ssr: true,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const BuyACoffee = dynamic(() => import("@/components/sections/buy-a-coffee").then(mod => ({ default: mod.BuyACoffee })), {
  ssr: false,
  loading: () => <div className="h-32 animate-pulse bg-muted rounded-lg" />
})

const BottomDock = dynamic(() => import("@/components/sections/dock").then(mod => ({ default: mod.BottomDock })), {
  ssr: false,
  loading: () => null
})

const ExpandableChatDemo = dynamic(() => import("@/components/ui/expandable-chat-demo").then(mod => ({ default: mod.ExpandableChatDemo })), {
  ssr: false,
  loading: () => null
})

import type { MapProps } from "@/components/ui/world-map"
const WorldMap = dynamic<MapProps>(
  () => import("@/components/ui/world-map").then((mod) => mod.WorldMap),
  { 
    ssr: false,
    loading: () => <div className="w-full aspect-[2/1] animate-pulse bg-muted rounded-lg" />
  }
)

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 space-y-16">
          {/* Critical above-the-fold content - no lazy loading */}
          <Hero />
          <Bio />
          
          {/* Defer heavy map component */}
          <Suspense fallback={<div className="w-full aspect-[2/1] animate-pulse bg-muted rounded-lg" />}>
            <WorldMap
              dots={[
                { start: { lat: 18.6796, lng: 105.6818 }, end: { lat: 21.0278, lng: 105.8342 } },  // Vinh → Hanoi
                { start: { lat: 21.0278, lng: 105.8342 }, end: { lat: 22.3193, lng: 114.1694 } },  // Hanoi → Hong Kong
                { start: { lat: 22.3193, lng: 114.1694 }, end: { lat: 29.6516, lng: -82.3248 } },  // Hong Kong → Gainesville
              ]}
            />
          </Suspense>
          
          {/* Progressive loading of sections */}
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <Projects />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <Experience />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <Education />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <Skills />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <Blog />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <QA />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <Contact />
          </Suspense>
          
          <Suspense fallback={<div className="h-32 animate-pulse bg-muted rounded-lg" />}>
            <BuyACoffee />
          </Suspense>
        </div>
      </main>
      
      {/* Non-critical UI elements - fully client-side */}
      <Suspense fallback={null}>
        <BottomDock />
      </Suspense>
      
      <Suspense fallback={null}>
        <ExpandableChatDemo />
      </Suspense>
    </>
  )
}
