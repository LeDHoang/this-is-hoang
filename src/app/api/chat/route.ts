import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { OpenAI } from 'openai'

export const runtime = 'edge'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { global: { fetch } }
)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

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

  // 1) create question embedding
  const embRes = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: userContent.replace(/\n/g, ' '),
  })
  const questionEmbedding = embRes.data[0].embedding

  // 2) fetch matching documents
  const { data: docs, error } = await supabase.rpc('match_documents', {
    query_embedding: questionEmbedding,
    match_threshold: 0.7,
    match_count: 10,
  })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  const context = (docs || []).map((d: any) => d.content).join('\n---\n')

  // 3) build messages array
  const messages: any[] = [
    {
      role: 'system',
      content: `You are a helpful assistant. Use ONLY the following résumé snippets to answer the question.
${context}`,
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
          model: 'gpt-4o-mini-2024-07-18',
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