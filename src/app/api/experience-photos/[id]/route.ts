import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dirPath = path.join(process.cwd(), "public", "experience-photos", id)
  try {
    const files = fs.readdirSync(dirPath).filter((file) => /\.(png|jpe?g|gif|webp)$/i.test(file))
    const images = files.map((file) => `/experience-photos/${id}/${file}`)
    return NextResponse.json({ images })
  } catch (error) {
    return NextResponse.json({ images: [] })
  }
} 