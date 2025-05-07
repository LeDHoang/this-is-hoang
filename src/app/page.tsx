import { Bio } from "@/components/sections/bio"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Skills } from "@/components/sections/skills"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-16">
        <Bio />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </div>
    </main>
  )
}
