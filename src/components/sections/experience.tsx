"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { experiences } from "@/lib/experience"

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
