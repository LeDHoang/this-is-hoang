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
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery"
import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { BrandGithub } from "@mynaui/icons-react"
import Link from "next/link"
import { projects, categories } from "@/lib/projects"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Projects() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const monthMap: Record<string, number> = { Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12 }
  const sortedProjects = projects.slice().sort((a, b) => {
    if (a.date === 'Current Project') return -1
    if (b.date === 'Current Project') return 1
    const [aMon, aYear] = a.date.split(' ')
    const [bMon, bYear] = b.date.split(' ')
    const aTime = new Date(parseInt(aYear), (monthMap[aMon as keyof typeof monthMap] || 0) - 1).getTime()
    const bTime = new Date(parseInt(bYear), (monthMap[bMon as keyof typeof monthMap] || 0) - 1).getTime()
    return bTime - aTime
  })

  return (
    <section id="projects" className="space-y-6">
      <h2 className="text-3xl font-bold">Projects</h2>
      <Tabs defaultValue={categories[0]} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:border-2 data-[state=active]:border-primary data-[state=active]:z-10 relative"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            {category === "Photography" ? (
              <>
                <InteractiveBentoGallery
                  mediaItems={[
                    {
                      id: 1,
                      type: "image",
                      title: "Anurag Mishra",
                      desc: "Driven, innovative, visionary",
                      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
                    },
                    {
                      id: 2,
                      type: "video",
                      title: "Dog Puppy",
                      desc: "Adorable loyal companion.",
                      url: "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
                      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
                    },
                    {
                      id: 3,
                      type: "image",
                      title: "Forest Path",
                      desc: "Mystical forest trail",
                      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
                      span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
                    },
                    {
                      id: 4,
                      type: "image",
                      title: "Falling Leaves",
                      desc: "Autumn scenery",
                      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
                      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
                    },
                    {
                      id: 5,
                      type: "video",
                      title: "Bird Parrot",
                      desc: "Vibrant feathered charm",
                      url: "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
                      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
                    },
                    {
                      id: 6,
                      type: "image",
                      title: "Beach Paradise",
                      desc: "Sunny tropical beach",
                      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
                      span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
                    },
                    {
                      id: 7,
                      type: "video",
                      title: "Shiva Temple",
                      desc: "Peaceful Shiva sanctuary.",
                      url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
                      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
                    },
                  ]}
                  title="A Shots Collection - A Flash of Glory"
                  description="Drag and explore my life"
                />
                <div className="pt-0.5 pb-0.5">
                  <ThreeDPhotoCarousel />
                </div>
              </>
            ) : (
              <div className="w-full overflow-auto pb-4">
                <div className="flex space-x-6 p-2">
                  {sortedProjects
                    .filter((project) => project.category === category)
                    .map((project) => {
                      const slug = project.title
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')
                        .replace(/-+/g, '-')
                        .replace(/^-+|-+$/g, '');
                      return (
                        <Card
                          key={project.title}
                          className={cn(
                            "card-hover rounded-md overflow-hidden w-[350px] min-w-[350px] flex-shrink-0 transition-all duration-300",
                            expandedCard === project.title && "expanded w-[600px] min-w-[600px]"
                          )}
                        >
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle className="glitch" data-text={project.title}>{project.title}</CardTitle>
                                <CardDescription>{project.date}</CardDescription>
                                <Button asChild variant="outline" size="icon" aria-label="View Project" className="mt-1">
                                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    <BrandGithub className="h-4 w-4" />
                                  </a>
                                </Button>
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
                                {project.title === "Personal Portfolio Website" ? (
                                  <Button asChild variant="outline" className="px-2">
                                    <Link href="#bio" className="inline-flex items-center">
                                      View
                                    </Link>
                                  </Button>
                                ) : (
                                  <Button asChild variant="outline" className="px-2">
                                    <Link href={`/projects/${slug}/changelog`} className="inline-flex items-center">
                                      Changelog <ExternalLink className="ml-1 h-4 w-4" />
                                    </Link>
                                  </Button>
                                )}
                                {project.presentationLink && (
                                  <Button asChild variant="outline" className="px-2">
                                    <a href={project.presentationLink} target="_blank" rel="noopener noreferrer">
                                      Presentation <ExternalLink className="ml-1 h-4 w-4" />
                                    </a>
                                  </Button>
                                )}
                                {project.tableauLink && (
                                  <Button asChild variant="outline" className="px-2">
                                    <a href={project.tableauLink} target="_blank" rel="noopener noreferrer">
                                      Tableau Story <ExternalLink className="ml-1 h-4 w-4" />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
} 