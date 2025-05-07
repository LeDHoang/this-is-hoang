"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const skillGroups = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "JavaScript/TypeScript", level: "Advanced" },
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
      { name: "scikit-learn", level: "Expert" },
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
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group) => (
          <Card key={group.title}>
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{
                          width: `${
                            skill.level === "Expert"
                              ? "100%"
                              : skill.level === "Advanced"
                              ? "80%"
                              : "60%"
                          }`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 