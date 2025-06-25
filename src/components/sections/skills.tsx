"use client"

import * as React from "react"
import Terminal from "@/components/ui/terminal"

const skillGroups = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "SQL", level: "Advanced" },
      { name: "R", level: "Intermediate" },
      { name: "C++", level: "Intermediate" }
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "TensorFlow", level: "Expert" },
      { name: "PyTorch", level: "Expert" },
      { name: "React", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "Scikit-learn", level: "Expert" },
      { name: "Pandas", level: "Expert" },
      { name: "NumPy", level: "Expert" }
    ]
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "AWS", level: "Advanced" },
      { name: "Docker", level: "Advanced" },
      { name: "Kubernetes", level: "Intermediate" },
      { name: "Git", level: "Expert" },
      { name: "Linux", level: "Advanced" },
      { name: "Jupyter", level: "Expert" }
    ]
  },
  {
    title: "Domains/Concepts",
    skills: [
      { name: "Machine Learning", level: "Expert" },
      { name: "Deep Learning", level: "Expert" },
      { name: "Natural Language Processing", level: "Advanced" },
      { name: "Computer Vision", level: "Advanced" },
      { name: "Data Engineering", level: "Advanced" },
      { name: "MLOps", level: "Advanced" }
    ]
  }
]

export function Skills() {
  return (
    <section id="skills" className="space-y-6">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group) => (
          <Terminal
            key={group.title}
            title={`${group.title.replace(/\s+/g, "_").toLowerCase()}.sh`}
            className="w-full"
            showPrompt={false}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <span className="text-primary text-[1.1rem]">$</span>
                  <span className="text-white text-[1.1rem]">{skill.name}</span>
                </div>
              ))}
            </div>
          </Terminal>
        ))}
      </div>
    </section>
  )
} 