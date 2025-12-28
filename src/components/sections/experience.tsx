"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const experiences = [
  {
    id: "softwareone",
    role: "AI Engineer",
    company: "Software One",
    period: "10/2024 - Current",
    location: "Ha Noi, Vietnam",
    description: "Designed and deployed a GenAI chatbot for Agrobank (external and internal users) on AWS using Bedrock, LangChain, Amazon S3, and OpenSearch, delivering scalable, retrieval-augmented (RAG) responses grounded in bank-specific knowledge.",
    responsibilities: [
      "Designed and deployed a GenAI chatbot for Agrobank (external and internal users) on AWS using Bedrock, LangChain, Amazon S3, and OpenSearch, delivering scalable, retrieval-augmented (RAG) responses grounded in bank-specific knowledge",
      "Implemented tenant-aware data governance and strict knowledge-base separation so customer- and staff-facing assistants only accessed authorized content",
      "Spearheaded a greenfield internal AI platform that distilled cutting-edge research into production-ready pipelines, ingesting documents, databases, and unstructured text to deliver rich, multimodal, multi-format query and GenAI platform for enterprise clients"
    ],
    techStack: ["AWS", "Bedrock", "LangChain", "Amazon S3", "OpenSearch"],
    achievements: [
      "Delivered scalable, retrieval-augmented GenAI chatbot with bank-specific knowledge grounding",
      "Implemented secure tenant-aware data governance and knowledge-base separation",
      "Built comprehensive internal AI platform for enterprise multimodal queries"
    ]
  },
  {
    id: "verifone",
    role: "Machine Learning Internship",
    company: "Verifone",
    period: "Aug 2024 - May 2025",
    location: "FL, United States",
    description: "Developed fraud detection models and streamlined ETL processes while collaborating with cross-functional teams.",
    responsibilities: [
      "Designed and implemented a centralized, multi-site fraud detection model using Python, TensorFlow, and TCNN",
      "Streamlined ETL processes and improved model efficiency with hyperparameter tuning via Optuna",
      "Leveraged ClearML for performance evaluation and monitoring",
      "Recognized as the #1 Software Engineering team in the program and delivered an executive-level presentation to the Gainesville Chamber of Commerce.",
      "Worked with diverse teams to integrate a user-friendly UI into the C-Suite system"
    ],
    techStack: ["Python", "TensorFlow", "TCNN", "Optuna", "ClearML"],
    achievements: [
      "Boosted detection accuracy by 20%",
      "Cut training time by 50% through hyperparameter optimization",
      "Enhanced oversight and expedited anomaly detection across 16 sites",
      "#1 Software Engineering team in the program and delivered an executive-level presentation to the Gainesville Chamber of Commerce."
    ],
    videoUrl: "https://www.youtube.com/embed/C-FGNGZRKQE"
  },
  {
    id: "eufinity",
    role: "Web Design Internship",
    company: "Eufinity",
    period: "Apr 2023 - Aug 2023",
    location: "FL, United States",
    description: "Developed a mental support platform website for college students, focusing on secure consultation and effective matching algorithms.",
    responsibilities: [
      "Established a mental support platform website from scratch using Javascript, CSS, and HTML5",
      "Constructed and implemented a matching feature utilizing ranking algorithms to pair coaches and students",
      "Improved web code quality, dynamic, and performance for different devices",
      "Ensured platform security and confidentiality for mental health consultations"
    ],
    techStack: ["JavaScript", "CSS", "HTML5"],
    achievements: [
      "Created a secure and confidential platform for college mental health consultation",
      "Successfully implemented an algorithm-based matching system for coaches and students",
      "Optimized website performance across multiple device types"
    ]
  },
  {
    id: "its",
    role: "Machine Learning Internship",
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
  const [photos, setPhotos] = useState<Record<string, string[]>>({})
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  useEffect(() => {
    experiences.forEach(({ id }) => {
      fetch(`/api/experience-photos/${id}`)
        .then((res) => res.json())
        .then(({ images }) => {
          setPhotos((prev) => ({ ...prev, [id]: images }))
        })
        .catch(() => {
          setPhotos((prev) => ({ ...prev, [id]: [] }))
        })
    })
  }, [])

  return (
    <>
      <section id="experience" className="space-y-6">
        <h2 className="text-3xl font-bold">Experience</h2>
        <div className="space-y-8">
          {experiences.map((experience) => (
            <Card 
              key={experience.id} 
              className={cn(
                "relative transition-all duration-300",
                expandedCard === experience.id && "ring-2 ring-[rgba(0,255,140,0.5)]"
              )}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{experience.company}</CardTitle>
                    <CardDescription>
                      {experience.role} • {experience.period}
                    </CardDescription>
                    <CardDescription>{experience.location}</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setExpandedCard(expandedCard === experience.id ? null : experience.id)}
                    className="h-8 w-8 rounded border-2 border-[rgba(0,255,140,0.5)]"
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
                    <div className="space-y-2">
                      <h4 className="font-semibold">Photos</h4>
                      <div className="flex overflow-x-auto gap-2">
                        {(photos[experience.id] || []).map((url) => (
                          <img
                            key={url}
                            src={url}
                            alt={`${experience.company} photo`}
                            className="h-72 w-72 object-cover rounded-md cursor-pointer"
                            onClick={() => setSelectedPhoto(url)}
                          />
                        ))}
                      </div>
                    </div>
                    {experience.videoUrl && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Video Playback</h4>
                        <div className="flex overflow-x-auto gap-2">
                          <iframe
                            src={experience.videoUrl}
                            title={`${experience.company} video playback`}
                            className="h-72 w-72 rounded-md"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 cursor-pointer"
        >
          <img
            src={selectedPhoto}
            alt="Full view"
            className="max-h-[60vh] max-w-[60vw] object-contain"
            style={{ animation: 'scaleIn 0.3s ease-out' }}
          />
        </div>
      )}
      <style jsx global>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.75); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
} 