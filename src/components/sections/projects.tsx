"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const categories = ["Machine Learning", "Data Science", "Web Design", "Photography"]

const projects = [
  {
    title: "RAG-based PDF Query System for Healthcare Insurance",
    date: "Dec 2024",
    category: "Machine Learning",
    summary: "Developed a Streamlit-based RAG application that ingests healthcare insurance PDFs, chunks and embeds text with FAISS + AWS S3, and delivers context-aware GenAI answers via Claude/Amazon Titan.",
    techStack: ["Python", "Streamlit", "Docker", "LangChain", "FAISS", "AWS S3", "Claude", "Amazon Titan"],
    logs: [
      { date: "2024-10-01", note: "Defined architecture & data flow; established PDF ingestion pipeline" },
      { date: "2024-11-15", note: "Implemented text chunking & FAISS embedding generation" },
      { date: "2024-12-01", note: "Built admin UI for PDF uploads; integrated AWS S3 index storage" },
      { date: "2024-12-10", note: "Launched user Streamlit interface; validated answer accuracy > 95%" }
    ],
    achievements: [
      "95%+ accurate context-aware PDF Q&A",
      "Dockerized for one-click deployment"
    ],
    link: "https://github.com/LeDHoang/RAG-LLM-Healthcare-Insurance"
  },
  {
    title: "DeepSeekResearch: Multi-Agent Research Assistant",
    date: "Jan 2025",
    category: "Machine Learning",
    summary: "Built a multi-agent AI research assistant using CrewAI and LangChain, guiding users through automated search, analysis, and structured report generation via a Streamlit interface.",
    techStack: ["Python", "Streamlit", "CrewAI", "LangChain", "OpenAI API", "Docker"],
    logs: [
      { date: "2024-11-20", note: "Scaffolded multi-agent architecture; defined agent roles" },
      { date: "2024-12-05", note: "Integrated advanced search tools; implemented prompt chaining" },
      { date: "2024-12-20", note: "Designed Streamlit UI for prompt refinement & report output" },
      { date: "2025-01-10", note: "Conducted user testing; iterated on UI & agent workflows" }
    ],
    achievements: [
      "Reduced research synthesis time by 50% in pilot tests",
      "User-configurable prompt refinement interface"
    ],
    link: "https://github.com/LeDHoang/DeepseekR1-Deep-Research-Agent"
  }
]

export function Projects() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">Projects</h2>
      <Tabs defaultValue={categories[0]} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <ScrollArea className="w-full">
              <div className="flex space-x-4 pb-4">
                {projects
                  .filter((project) => project.category === category)
                  .map((project) => (
                    <Card key={project.title} className="w-[350px] flex-shrink-0">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>{project.date}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{project.summary}</p>
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="space-y-1">
                            {project.achievements.map((achievement) => (
                              <p key={achievement} className="text-sm">
                                • {achievement}
                              </p>
                            ))}
                          </div>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            View Project →
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
} 