import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

// Duplicate of blog posts data since it's currently hardcoded in the page component
const blogPosts = [
  { id: "future-of-ai", date: "2023-05-15" },
  { id: "web3-revolution", date: "2023-04-22" },
  { id: "cybersecurity-tips", date: "2023-03-10" },
  { id: "react-performance", date: "2023-02-18" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://lehoangduc.com/'

  const routes = [
    '',
    '/projects',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/changelog`,
    lastModified: new Date().toISOString(),
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.date,
  }))

  return [...routes, ...projectRoutes, ...blogRoutes]
}

