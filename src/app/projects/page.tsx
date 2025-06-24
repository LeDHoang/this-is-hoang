"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ProjectCard } from "@/components/project-card"

interface Project {
  id: string
  title: string
  description: string
  image?: string
  technologies: string[]
  category: string
}

const categories = ["All Projects", "Machine Learning", "Data Science", "Web Design", "Photography"]

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All Projects")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true)
      let query = supabase
        .from("projects")
        .select("slug, title, summary, category")
        .order("date", { ascending: false })

      if (activeFilter !== "All Projects") {
        query = query.eq("category", activeFilter)
      }

      const { data, error } = await query

      if (error) {
        console.error("Error fetching projects:", error)
        setProjects([])
      } else if (data) {
        setProjects(
          data.map((p: any) => ({
            id: p.slug,
            title: p.title,
            description: p.summary,
            technologies: [],
            category: p.category,
          }))
        )
      }
      setLoading(false)
    }

    fetchProjects()
  }, [activeFilter])

  const filteredProjects = projects

  return (
    <div className="space-y-8 p-8">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-button terminal-button-red" />
          <div className="terminal-button terminal-button-yellow" />
          <div className="terminal-button terminal-button-green" />
          <div className="terminal-title">projects.sh</div>
        </div>
        <div className="terminal-content">
          <p className="mb-4">
            <span className="text-primary">$</span> Displaying projects directory. Select category to filter results.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              activeFilter === category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
            />
          ))
        ) : (
          <p>No projects found for selected category.</p>
        )}
      </div>
    </div>
  )
} 