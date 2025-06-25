"use client"

import * as React from "react"
import Terminal from "@/components/ui/terminal"

export function Education() {
  const education = {
    degree: "B.Sc. Computer Science",
    institution: "University of Florida",
    gpa: "3.6",
    period: "Expected Aug 2025"
  }

  const awards = [
    "Herbert Wertheim College of Engineering Dean's List",
    "Sigma Alpha Mu Fraternity Gamma Tau Chapter"
  ]

  const certifications = [
    "IBM AI Engineering Professional Certificate (Ongoing)",
    "Ironhack Data Analytics Bootcamp"
  ]

  return (
    <section id="education" className="space-y-6">
      <h2 className="text-3xl font-bold">Education</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Terminal key="institution" title={`${education.institution.replace(/\s+/g, "_").toLowerCase()}.sh`} className="w-full" showPrompt={false}>
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-primary text-[1.1rem]">$</span>
              <span className="text-white text-[1.1rem]">Degree: {education.degree}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-[1.1rem]">$</span>
              <span className="text-white text-[1.1rem]">Minor - Business Administration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-[1.1rem]">$</span>
              <span className="text-white text-[1.1rem]">GPA: {education.gpa}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary text-[1.1rem]">$</span>
              <span className="text-white text-[1.1rem]">Period: {education.period}</span>
            </div>
          </div>
        </Terminal>
        <Terminal key="awards" title="awards_and_memberships.sh" className="w-full" showPrompt={false}>
          <div className="flex flex-col space-y-2">
            {awards.map((award) => (
              <div key={award} className="flex items-center gap-2">
                <span className="text-primary text-[1.1rem]">$</span>
                <span className="text-white text-[1.1rem]">{award}</span>
              </div>
            ))}
          </div>
        </Terminal>
        <Terminal key="certifications" title="certifications.sh" className="w-full" showPrompt={false}>
          <div className="flex flex-col space-y-2">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2">
                <span className="text-primary text-[1.1rem]">$</span>
                <span className="text-white text-[1.1rem]">{cert}</span>
              </div>
            ))}
          </div>
        </Terminal>
      </div>
    </section>
  )
} 