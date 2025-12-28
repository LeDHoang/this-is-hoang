import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import { projects } from '@/lib/projects'
import { experiences } from '@/lib/experience'
import { skillGroups } from '@/lib/skills'
import { education, awards, certifications } from '@/lib/education'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Build comprehensive context from website data
const buildContext = () => {
  let context = `ABOUT HOANG LE:
Name: Hoang Le
Title: Machine Learning Engineer & Full Stack Developer
Location: Ha Noi, Vietnam
Description: Motivated Computer Science student with hands-on experience in Machine Learning, NLP, and Generative AI, specializing in building innovative, production-ready solutions.
Links: GitHub - https://github.com/LeDHoang, LinkedIn - https://www.linkedin.com/in/hoangleduc/

EDUCATION:
- Degree: ${education.degree}
- Institution: ${education.institution}
- Minor: ${education.minor}
- Awards: ${awards.join(', ')}
- Certifications: ${certifications.join(', ')}

WORK EXPERIENCE:
`

  experiences.forEach(exp => {
    context += `
${exp.role} at ${exp.company} (${exp.period}) - ${exp.location}
Description: ${exp.description}
Technologies: ${exp.techStack.join(', ')}
Key Achievements: ${exp.achievements.join(', ')}
`
  })

  context += `

SKILLS:
`
  
  skillGroups.forEach(group => {
    context += `${group.title}: ${group.skills.map(s => `${s.name} (${s.level})`).join(', ')}\n`
  })

  context += `
PROJECTS:
`

  projects.forEach(project => {
    context += `
${project.title} (${project.date}) - ${project.category}
Summary: ${project.summary}
Technologies: ${project.techStack.join(', ')}
Key Achievements: ${project.achievements.join(', ')}
Link: ${project.link}
`
  })

  return context
}

// Reject GET requests
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}

// Handle POST for multimodal chat
export async function POST(request: Request) {
  // debug
  console.log('[api/chat] POST hit')
  const form = await request.formData()
  const rawQuery = form.get('query')
  const imageFile = form.get('image') as File | null
  const audioFile = form.get('audio') as File | null

  // Determine user content
  let userContent = rawQuery?.toString() || ''
  if (audioFile) {
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    })
    userContent = transcription.text
  }
  if (!userContent) {
    return NextResponse.json({ error: 'No text or audio provided' }, { status: 400 })
  }

  // 3) build messages array with comprehensive context
  const context = buildContext()
  const messages: any[] = [
    {
      role: 'system',
      content: `You are a helpful AI assistant for Hoang Le's portfolio website. Use ONLY the information provided below to answer questions about Hoang's background, experience, projects, skills, and education. If asked about something not covered in this context, politely say you don't have that information or suggest they contact Hoang directly.

CONTEXT INFORMATION:
${context}

INSTRUCTIONS:
- Be friendly, professional, and accurate
- Reference specific projects, experiences, and skills from the context
- When mentioning projects, include relevant technologies and achievements
- If asked about current work or recent updates, reference the most recent projects and experiences
- For technical questions, draw from the skills and project details provided`,
    },
  ]
  messages.push({ role: 'user', content: userContent })
  if (imageFile) {
    const ab = await imageFile.arrayBuffer()
    const b64 = btoa(String.fromCharCode(...new Uint8Array(ab)))
    messages.push({ role: 'user', name: 'image', content: b64 })
  }

  // 4) stream completion via SSE using GPT-4o-mini
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion: any = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          stream: true,
          messages,
        })
        for await (const part of completion) {
          const chunk = part.choices[0].delta.content
          if (chunk) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`)
            )
          }
        }
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`)
        )
        controller.close()
      } catch (err) {
        controller.error(err)
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
} 