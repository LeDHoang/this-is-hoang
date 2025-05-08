"use client"

import * as React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const experiences = [
  {
    id: "verifone",
    role: "Machine Learning and AI Internship",
    company: "Verifone",
    period: "Aug 2024 - May 2025",
    location: "FL, United States",
    description: "Developed fraud detection models and streamlined ETL processes while collaborating with cross-functional teams.",
    responsibilities: [
      "Designed and implemented a centralized, multi-site fraud detection model using Python, TensorFlow, and TCNN",
      "Streamlined ETL processes and improved model efficiency with hyperparameter tuning via Optuna",
      "Leveraged ClearML for performance evaluation and monitoring",
      "Worked with diverse teams to integrate a user-friendly UI into the C-Suite system"
    ],
    techStack: ["Python", "TensorFlow", "TCNN", "Optuna", "ClearML"],
    achievements: [
      "Boosted detection accuracy by 20%",
      "Cut training time by 50% through hyperparameter optimization",
      "Enhanced oversight and expedited anomaly detection across 16 sites"
    ]
  },
  {
    id: "its",
    role: "Machine Learning and AI Internship",
    company: "Institute of Technology and Science",
    period: "May 2022 - July 2022",
    location: "Ha Noi, Vietnam",
    description: "Developed a facial identification system for touch-free COVID-safe applications.",
    responsibilities: [
      "Engineered a Python-based facial identification system using PyTorch and CNN",
      "Curated a dataset of over 5000 facial keypoint photos from public sources and onsite volunteers",
      "Optimized model performance for various lighting conditions and subjects"
    ],
    techStack: ["Python", "PyTorch", "CNN"],
    achievements: [
      "Achieved 87% accuracy under diverse conditions",
      "Outperformed existing systems by 10%",
      "Created a comprehensive dataset for improved model training"
    ]
  }
]

export function Experience() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Experience</h2>
      <div className="space-y-8">
        {experiences.map((experience) => (
          <Card 
            key={experience.id} 
            className={cn(
              "relative transition-all duration-300",
              expandedCard === experience.id && "ring-2 ring-primary"
            )}
          >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{experience.role}</CardTitle>
                  <CardDescription>
                    {experience.company} • {experience.period}
                  </CardDescription>
                  <CardDescription>{experience.location}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpandedCard(expandedCard === experience.id ? null : experience.id)}
                  className="h-8 w-8"
                >
                  {expandedCard === experience.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
              
              {expandedCard === experience.id && (
                <div className="space-y-4 pt-4">
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Responsibilities</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {experience.responsibilities.map((responsibility) => (
                        <li key={responsibility}>{responsibility}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Key Achievements</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {experience.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 