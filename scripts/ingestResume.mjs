import fs from 'fs'
import path from 'path'
import pdf from 'pdf-parse'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// Split text into chunks of approximately maxLen characters
async function chunkText(text, maxLen = 1000) {
  const sentences = text.split(/(?<=[.?!])\s+/)
  const chunks = []
  let buffer = ''
  for (const sentence of sentences) {
    if ((buffer + ' ' + sentence).length > maxLen) {
      chunks.push(buffer.trim())
      buffer = sentence
    } else {
      buffer += ' ' + sentence
    }
  }
  if (buffer) chunks.push(buffer.trim())
  return chunks
}

async function main() {
  const filePath = path.resolve(process.cwd(), 'public/docs/Hoang_Resume_LateMar.pdf')
  const dataBuffer = fs.readFileSync(filePath)
  const { text } = await pdf(dataBuffer)
  console.log(`Extracted ${text.length} characters from PDF.`)

  const chunks = await chunkText(text)
  console.log(`Split into ${chunks.length} chunks.`)

  for (const content of chunks) {
    try {
      const embeddingRes = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: content.replace(/\n/g, ' '),
      })
      const [embedding] = embeddingRes.data.map(d => d.embedding)
      const { error } = await supabase
        .from('documents')
        .insert({ content, embedding, metadata: { source: 'resume' } })
      if (error) throw error
    } catch (err) {
      console.error('Error ingesting chunk:', err)
    }
  }
  console.log('Resume ingestion complete.')
}

main().catch(console.error) 