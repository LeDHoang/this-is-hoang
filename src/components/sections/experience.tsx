"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const experiences = [
  {
    role: "Senior Machine Learning Engineer",
    company: "TechCorp AI",
    period: "Jan 2023 - Present",
    location: "San Francisco, CA",
    description: "Leading the development of AI-powered solutions for enterprise clients, focusing on natural language processing and computer vision applications.",
    responsibilities: [
      "Architected and implemented scalable ML pipelines for processing large-scale datasets",
      "Led a team of 5 engineers in developing and deploying ML models to production",
      "Collaborated with product teams to define and implement AI features",
      "Mentored junior engineers and conducted technical interviews"
    ],
    techStack: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes"],
    achievements: [
      "Reduced model training time by 60% through distributed computing optimization",
      "Achieved 95% accuracy in production ML models",
      "Successfully deployed 10+ ML models to production"
    ]
  },
  {
    role: "Machine Learning Engineer",
    company: "DataFlow Systems",
    period: "Mar 2020 - Dec 2022",
    location: "Seattle, WA",
    description: "Developed and maintained machine learning models for data processing and analysis pipelines.",
    responsibilities: [
      "Implemented data preprocessing and feature engineering pipelines",
      "Developed and optimized ML models for various business use cases",
      "Collaborated with data scientists to improve model performance",
      "Maintained and monitored production ML systems"
    ],
    techStack: ["Python", "scikit-learn", "Pandas", "NumPy", "SQL", "Git"],
    achievements: [
      "Improved model accuracy by 25% through feature engineering",
      "Reduced data processing time by 40%",
      "Implemented automated model monitoring system"
    ]
  }
]

export function Experience() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Experience</h2>
      <div className="space-y-8">
        {experiences.map((experience) => (
          <Card key={experience.role} className="relative">
            <CardHeader>
              <CardTitle>{experience.role}</CardTitle>
              <CardDescription>
                {experience.company} • {experience.period}
              </CardDescription>
              <CardDescription>{experience.location}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{experience.description}</p>
              <div className="space-y-2">
                <h4 className="font-semibold">Key Responsibilities:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {experience.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {experience.achievements.map((achievement) => (
                    <li key={achievement}>{achievement}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
} 