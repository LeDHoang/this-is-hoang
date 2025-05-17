import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

interface ContactRequest {
  name: string
  email: string
  subject?: string
  message: string
}

export async function POST(request: Request) {
  try {
    const { name, email, subject, message }: ContactRequest = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Create transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: subject || 'New Contact Form Submission',
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p>`,
    })

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
} 