"use client"

import * as React from "react"
import Terminal from "@/components/ui/terminal"
import { skillGroups } from "@/lib/skills"

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