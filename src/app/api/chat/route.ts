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

export async function GET(request: Request) {
  console.log('[api/chat] endpoint hit:', request.url)
  console.log('[api/chat] ENV:', {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'missing',
    OPENAI_KEY: process.env.OPENAI_API_KEY ? 'set' : 'missing',
  })
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    if (!query) {
      return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 })
    }

    // 1) create question embedding
    const embRes = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: query.replace(/\n/g, ' '),
    })
    const questionEmbedding = embRes.data[0].embedding

    // 2) fetch matching documents
    const { data: docs, error } = await supabase.rpc('match_documents', {
      query_embedding: questionEmbedding,
      match_threshold: 0.7,
      match_count: 10,
    })
    console.log('[api/chat] RPC docs count:', docs?.length)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const context = (docs || []).map((d: any) => d.content).join('\n---\n')
    const prompt = [`
You are a helpful assistant. Use ONLY the following résumé snippets to answer the question.
${context}

Q: ${query}
A:
`]

    // 3) stream OpenAI chat completion as SSE
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const completion: any = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [{ role: 'user', content: prompt.join('') }],
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
      }
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (err) {
    console.error('[api/chat] unexpected error', err)
    return NextResponse.json({ error: (err as any).message ?? String(err) }, { status: 500 })
  }
} 