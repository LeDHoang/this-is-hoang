"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
        <Card>
          <CardHeader>
            <CardTitle>{education.institution}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-[18px]">{education.degree}</span>
              <span>Minor - Business Administration</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Awards & Memberships</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              {awards.map((award) => (
                <Badge key={award} variant="secondary">
                  {award}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              {certifications.map((cert) => (
                <Badge key={cert} variant="secondary">
                  {cert}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 