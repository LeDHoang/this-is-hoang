"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import ReCAPTCHA from "react-google-recaptcha"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

type FormValues = z.infer<typeof formSchema>

export function Contact() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [recaptchaToken, setRecaptchaToken] = React.useState<string | null>(null)
  const recaptchaRef = React.useRef<ReCAPTCHA>(null)
  const { theme } = useTheme()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: FormValues) {
    if (!recaptchaToken) {
      toast.error("Please complete the captcha before sending.", { style: { background: "red", color: "white" } })
      return
    }
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, token: recaptchaToken }),
      })
      if (!response.ok) {
        throw new Error('Failed to send message')
      }
      recaptchaRef.current?.reset()
      setRecaptchaToken(null)
      toast.success('Message sent successfully!')
      form.reset()
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="space-y-6">
      <h2 className="text-3xl font-bold">Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
            <CardDescription>
              Fill out the form below and I'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="What's this about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message..."
                          className="min-h-[100px] border-2 border-[rgba(0,255,140,0.5)]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4 flex justify-center">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token: string | null) => setRecaptchaToken(token)}
                    ref={recaptchaRef}
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Alternative Contact Methods</CardTitle>
            <CardDescription>
              Feel free to reach out through any of these channels.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full p-6 space-y-4">
            <div>
              <div className="space-y-1">
                <p className="font-medium">Email</p>
                <a
                  href="mailto:leduchoang011@gmail.com"
                  className="text-white hover:underline block"
                >
                  leduchoang011@gmail.com
                </a>
                <a
                  href="mailto:le.hoang@ufl.edu"
                  className="text-white hover:underline block"
                >
                  le.hoang@ufl.edu
                </a>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">LinkedIn</h4>
                <a
                  href="https://www.linkedin.com/in/hoangleduc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  www.linkedin.com/in/hoangleduc
                </a>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">GitHub</h4>
              <a
                href="https://github.com/LeDHoang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                www.github.com/LeDHoang
              </a>
            </div>
            
            <div className="flex-grow flex flex-col justify-center pt-4 border-t-2 border-t-[rgba(0,255,140,0.5)] mt-4">
              <div className="flex items-center justify-between relative top-[-40px]">
                <div className="text-3xl font-bold italic text-primary">Go Gatorsss!!!</div>
                <div className="relative w-1/2 overflow-visible z-10">
                  <div
                    className="dotted-gator absolute top-1/2 right-0 transform -translate-y-1/2 z-20 w-16 h-16"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 