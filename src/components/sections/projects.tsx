"use client"

import * as React from "react"
import Image from "next/image"
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
import { AnimatedTabs } from "@/components/ui/animated-tabs"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function Projects() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(categories[0])
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
      <div className="w-full">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex justify-center min-w-full">
            <AnimatedTabs 
              tabs={categories} 
              activeTab={activeCategory} 
              onTabChange={setActiveCategory}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        
        <div className="mt-6">
          {/* Photography Special Layout */}
          {activeCategory === "Photography" ? (
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
             <div className="w-full pb-4 overflow-x-auto">
                <div className="flex space-x-6 p-2 max-w-full">
            {sortedProjects
              .filter((project) => activeCategory === "All" || project.category === activeCategory)
              .map((project, index) => {
                 const slug = project.title
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '')
                        .replace(/-+/g, '-')
                        .replace(/^-+|-+$/g, '');
                 return (
                <Card 
                  key={index}
                  className={cn(
                    "card-hover rounded-md overflow-hidden transition-all duration-300",
                    // Mobile: full width, only expand vertically
                    "w-full flex-shrink-0",
                    // Desktop: fixed width with horizontal expansion
                    "md:w-[350px] md:min-w-[350px]",
                    expandedCard === project.title && "md:w-[600px] md:min-w-[600px]"
                  )}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="glitch" data-text={project.title}>{project.title}</CardTitle>
                        <CardDescription>{project.date}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {project.link && (
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon">
                              {project.link.includes('github') ? <BrandGithub className="h-5 w-5" /> : <ExternalLink className="h-5 w-5" />}
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setExpandedCard(expandedCard === project.title ? null : project.title)}
                        >
                          {expandedCard === project.title ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="mb-4 text-muted-foreground">{project.summary}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                    {expandedCard === project.title && (
                      <div className="mt-4 space-y-4 animate-in fade-in zoom-in duration-300">
                        <Separator className="bg-[rgba(0,255,140,0.5)]" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold mb-2">Key Achievements</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                              {project.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2">Project Logs</h4>
                            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                              {project.logs.map((log, i) => (
                                <div key={i} className="mb-4 last:mb-0">
                                  <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-sm font-medium">{log.date}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{log.note}</p>
                                </div>
                              ))}
                            </ScrollArea>
                          </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <Link href={`/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/changelog`}>
                                <Button variant="outline" className="gap-2">
                                    View Full Changelog
                                    <ExternalLink className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>

                        {/* Visual Content Section */}
                        <div className="mt-8 space-y-8">
                          {/* Bento Grid Gallery */}
                          {project.title === "OneAgent - Query Agent for Enterprise Data" && (
                            <InteractiveBentoGallery
                              mediaItems={[
                                {
                                  id: 1,
                                  type: 'image',
                                  title: 'Agent Architecture',
                                  desc: 'LangGraph multi-agent orchestration',
                                  url: '/footage/photo/demo.gif', // Placeholder
                                  span: 'md:col-span-2 md:row-span-2'
                                },
                                {
                                  id: 2,
                                  type: 'video',
                                  title: 'Live Demo',
                                  desc: 'Real-time query processing',
                                  url: 'https://www.youtube.com/embed/Wa_pmswdkzQ',
                                  span: 'md:col-span-1 md:row-span-1'
                                },
                                {
                                  id: 3,
                                  type: 'image',
                                  title: 'Presentation',
                                  desc: 'System design slides',
                                  url: '/footage/photo/demo.gif', // Placeholder
                                  span: 'md:col-span-1 md:row-span-1'
                                },
                              ]}
                              title="Project Gallery"
                              description="Visual overview of the OneAgent system architecture and capabilities."
                            />
                          )}

                          {/* 3D Carousel for other projects if they have multiple images */}
                          {project.title !== "OneAgent - Query Agent for Enterprise Data" && (
                            <ThreeDPhotoCarousel 
                              images={[
                                '/footage/photo/demo.gif', // Placeholders
                                '/footage/photo/demo.gif',
                                '/footage/photo/demo.gif',
                              ]}
                            />
                          )}
                        </div>
                      </div>
                    )}
                                 <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-2 mt-4 w-full border-t-2 border-t-[rgba(0,255,140,0.5)] pt-3 px-1">
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
                                {(project.link.includes('youtube.com') || project.link.includes('youtu.be')) && (
                                  <Button asChild variant="outline" className="px-2">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                                      Demo <ExternalLink className="ml-1 h-4 w-4" />
                                    </a>
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
                  </CardContent>
                </Card>
              )})}
          </div>
          </div>
          )}
        </div>
      </div>
    </section>
  )
} 