"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface Project {
  title: string;
  date: string;
  category: string;
  summary: string;
  techStack: string[];
  logs: { date: string; note: string }[];
  achievements: string[];
  link: string;
  presentationLink?: string;
  tableauLink?: string;
}

const categories = ["Machine Learning", "Data Science", "Web Design", "Photography"]

const projects: Project[] = [
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
  },
  {
    title: "Tetouan City Machine Learning Project to Predict Power Consumption",
    date: "Jun 2024",
    category: "Machine Learning",
    summary: "Produced a predictive model for power consumption in Tetouan City using Machine Learning in Python, leveraging weather and time-related variables such as diffuse flow from UCIML Repo.",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "AdaBoost Regression"],
    logs: [
      { date: "2024-04-15", note: "Collected and preprocessed Tetouan City power consumption dataset from UCIML" },
      { date: "2024-05-01", note: "Performed exploratory data analysis; identified key weather and time variables" },
      { date: "2024-05-20", note: "Implemented and compared multiple regression models (Linear, Random Forest, AdaBoost)" },
      { date: "2024-06-10", note: "Optimized AdaBoost model hyperparameters; achieved 94.5% prediction accuracy" }
    ],
    achievements: [
      "Achieved 94.5% accuracy with AdaBoost Regression",
      "Identified key climate features impacting power consumption patterns"
    ],
    link: "https://github.com/raynardflores/powerhouse-squad-project"
  },
  {
    title: "Vanguard A/B Testing for New User Interface",
    date: "Jun 2024",
    category: "Data Science",
    summary: "Conducted a comprehensive analysis of client behavior and demographics in response to a new online process introduced by Vanguard Investing, using hypothesis testing to evaluate the effectiveness of UI changes.",
    techStack: ["Python", "Pandas", "NumPy", "Jupyter Notebook", "Tableau", "Statistical Analysis"],
    logs: [
      { date: "2024-04-05", note: "Cleaned and prepared client data from multiple sources for analysis" },
      { date: "2024-04-20", note: "Performed demographics analysis to identify primary client segments" },
      { date: "2024-05-10", note: "Conducted behavioral analysis examining completion rates, time spent, and error rates" },
      { date: "2024-05-25", note: "Applied hypothesis testing to evaluate significance of UI changes across user segments" },
      { date: "2024-06-15", note: "Created Tableau visualizations to present actionable insights to stakeholders" }
    ],
    achievements: [
      "Identified key demographic factors affecting UI interaction patterns",
      "Developed statistical framework comparing control vs test group performance",
      "Created comprehensive Tableau story visualizing test results and recommendations"
    ],
    link: "https://github.com/LeDHoang/Vanguard-AB-Testing",
    presentationLink: "https://docs.google.com/presentation/d/1IPHWxKpB7MLiGPrA37Z9vrTbxNYbdTQoBFnrYyi0Ybo/edit?usp=sharing",
    tableauLink: "https://public.tableau.com/app/profile/hoang.le.duc/viz/Book1_17176249007780/Dashboard5"
  },
  {
    title: "Professional Soccer Analytics and Team Optimization",
    date: "May 2024",
    category: "Data Science",
    summary: "Analyzed professional soccer database with 17k players and 2024 salary data scraped from Capology to find correlations between player statistics and compensation, then used linear programming to assemble optimal teams within budget constraints.",
    techStack: ["Python", "Pandas", "NumPy", "Jupyter Notebook", "Web Scraping", "Linear Programming"],
    logs: [
      { date: "2024-03-10", note: "Collected and integrated player statistics from Kaggle dataset" },
      { date: "2024-03-25", note: "Implemented web scraping solution to gather salary data from Capology" },
      { date: "2024-04-08", note: "Performed statistical analysis on player performance vs. compensation" },
      { date: "2024-04-20", note: "Developed linear programming model to optimize team selection within budget" },
      { date: "2024-05-05", note: "Generated optimal team compositions for both value and rating optimization" }
    ],
    achievements: [
      "Created algorithm to assemble best overall value team within budget constraints",
      "Developed separate model to maximize team rating while respecting position requirements",
      "Identified key performance metrics most correlated with player compensation"
    ],
    link: "https://github.com/LeDHoang/SportBetting-DataAnalytics",
    presentationLink: "https://docs.google.com/presentation/d/1E6k73X7N5hKuSZwvaJ0WUkMo4LVOeAdtlrb1h8VqSOw/edit?usp=sharing"
  }
]

export function Projects() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

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
              <div className="flex space-x-4 pb-4 snap-x snap-mandatory">
                {projects
                  .filter((project) => project.category === category)
                  .map((project) => (
                    <Card 
                      key={project.title} 
                      className={cn(
                        "w-[350px] flex-shrink-0 snap-start transition-all duration-300",
                        expandedCard === project.title && "w-[600px]"
                      )}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{project.title}</CardTitle>
                            <CardDescription>{project.date}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setExpandedCard(expandedCard === project.title ? null : project.title)}
                            className="h-8 w-8"
                          >
                            {expandedCard === project.title ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">{project.summary}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          
                          {expandedCard === project.title && (
                            <div className="space-y-4 pt-4">
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="font-semibold">Progress Logs</h4>
                                <div className="space-y-2">
                                  {project.logs.map((log) => (
                                    <div key={log.date} className="text-sm">
                                      <span className="font-medium">{log.date}:</span> {log.note}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold">Achievements</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                  {project.achievements.map((achievement) => (
                                    <li key={achievement}>{achievement}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full border-t pt-3 px-1">
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center text-sm text-primary hover:underline px-2"
                            >
                              <span>View Project</span> <ExternalLink className="ml-1 h-4 w-4" />
                            </a>
                            {project.presentationLink && (
                              <a
                                href={project.presentationLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center text-sm text-primary hover:underline px-2"
                              >
                                <span>Presentation</span> <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            )}
                            {project.tableauLink && (
                              <a
                                href={project.tableauLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center text-sm text-primary hover:underline px-2"
                              >
                                <span>Tableau Story</span> <ExternalLink className="ml-1 h-4 w-4" />
                              </a>
                            )}
                          </div>
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