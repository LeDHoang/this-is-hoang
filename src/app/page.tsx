import { Hero } from "@/components/sections/hero"
import { Bio } from "@/components/sections/bio"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Education } from "@/components/sections/education"
import { Skills } from "@/components/sections/skills"
import { Contact } from "@/components/sections/contact"
import { BottomDock } from "@/components/sections/dock"

export default function Home() {
  return (
    <>
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8 space-y-16">
          <Hero />
          <Bio />
          <Projects />
          <Experience />
          <Education />
          <Skills />
          <Contact />
        </div>
      </main>
      <BottomDock />
    </>
  )
}
