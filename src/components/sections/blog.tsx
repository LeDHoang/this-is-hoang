"use client";

import * as React from "react"
import Link from "next/link"
import { ArrowRight, CalendarIcon, Clock } from "lucide-react"

interface BlogCardProps {
  id: string
  title: string
  excerpt: string
  date: string
  readingTime: string
}

export function BlogCard({ id, title, excerpt, date, readingTime }: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}> 
      <div className="card-hover bg-card p-4 rounded-md h-full flex flex-col">
        <div className="flex items-center gap-2 text-[0.9rem] text-muted-foreground mb-2">
          <div className="flex items-center">
            <CalendarIcon size={14} className="mr-1" />
            {date}
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {readingTime}
          </div>
        </div>
        <h3 className="text-[1.35rem] font-bold mb-2 glitch" data-text={title}>
          {title}
        </h3>
        <p className="text-[1.05rem] text-muted-foreground">{excerpt}</p>
      </div>
    </Link>
  )
}

export function Blog() {
  const latestPosts: BlogCardProps[] = [
    {
      id: "future-of-ai",
      title: "The Future of AI Development",
      excerpt: "Exploring the ethical implications and technological advancements in artificial intelligence.",
      date: "2023-05-15",
      readingTime: "5 min read",
    },
    // More posts can be added here
  ]

  return (
    <section id="blog" className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest from the Blog</h2>
        <Link href="/blog" className="text-primary hover:underline inline-flex items-center gap-1">
          View all <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {latestPosts.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </section>
  )
} 