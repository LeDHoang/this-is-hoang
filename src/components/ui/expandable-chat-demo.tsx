"use client"

import { useState, FormEvent, useRef, ChangeEvent } from "react"
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { Square } from "@mynaui/icons-react"
import { Button } from "@/components/ui/button"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"

// Define Message type for chat messages
interface Message {
  id: number
  content?: string
  sender: 'user' | 'ai'
  type?: 'text' | 'image' | 'audio' | 'gif'
  src?: string
  fileName?: string
}

export function ExpandableChatDemo() {
  const initialMessages: Message[] = [
    { id: 1, type: "gif", src: "/footage/photo/giphy.gif", sender: "ai" },
    { id: 2, content: "Hello there, I might not be alive but I am <b><u style=\"text-decoration: underline\">mini-Hoang</u></b>, and I can answer any question you have about him.", sender: "ai" },
    { id: 3, content: "I have a question about Hoang as a person.", sender: "user" },
    { id: 4, content: "Sure! I'd be happy to help. What would you like to know?", sender: "ai" },
  ]
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleReset = () => {
    setMessages(initialMessages)
    setInput("")
    setIsLoading(false)
  }

  // Refs and state for file and audio handling
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const [isRecording, setIsRecording] = useState(false)

  // Helper to POST formData and stream SSE replies into the AI message
  async function sendFormData(formData: FormData, aiMessageId: number) {
    const res = await fetch('/api/chat', { method: 'POST', body: formData })
    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const parts = buffer.split('\n\n')
      buffer = parts.pop() || ''
      for (const part of parts) {
        if (part.trim().startsWith('data:')) {
          const jsonStr = part.replace(/^data:\s*/, '')
          const msg = JSON.parse(jsonStr)
          if (msg.done) {
            setIsLoading(false)
            return
          }
          setMessages(prev =>
            prev.map(m =>
              m.id === aiMessageId
                ? { ...m, content: (m.content || '') + msg.text }
                : m
            )
          )
        }
      }
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { id: messages.length + 1, content: input, sender: 'user' }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Add empty AI placeholder
    const aiMessage: Message = { id: userMessage.id + 1, content: '', sender: 'ai' }
    setMessages(prev => [...prev, aiMessage])

    // POST text to /api/chat and stream response
    const formData = new FormData()
    formData.append('query', input)
    await sendFormData(formData, aiMessage.id)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Show user image
    const userMessage: Message = { id: messages.length + 1, content: URL.createObjectURL(file), sender: 'user', type: 'image', fileName: file.name }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // AI placeholder
    const aiMessage: Message = { id: userMessage.id + 1, content: '', sender: 'ai' }
    setMessages(prev => [...prev, aiMessage])

    // POST image
    const formData = new FormData()
    formData.append('image', file)
    sendFormData(formData, aiMessage.id)
    e.target.value = ''
  }

  const handleAttachFile = () => {
    fileInputRef.current?.click()
  }

  const handleMicrophoneClick = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        audioChunksRef.current = []
        mediaRecorder.ondataavailable = event => {
          audioChunksRef.current.push(event.data)
        }
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
          const userMessage: Message = { id: messages.length + 1, content: URL.createObjectURL(audioBlob), sender: 'user', type: 'audio' }
          setMessages(prev => [...prev, userMessage])
          stream.getTracks().forEach(track => track.stop())
          setIsLoading(true)

          const aiMessage: Message = { id: userMessage.id + 1, content: '', sender: 'ai' }
          setMessages(prev => [...prev, aiMessage])

          // POST audio
          const formData = new FormData()
          formData.append('audio', audioBlob, 'audio.webm')
          sendFormData(formData, aiMessage.id)
        }
        mediaRecorder.start()
        setIsRecording(true)
      })
    } else {
      mediaRecorderRef.current?.stop()
      setIsRecording(false)
    }
  }

  return (
    <>
      <ExpandableChat
        size="lg"
        position="bottom-right"
        icon={<Bot className="h-6 w-6" />}
      >
        <ExpandableChatHeader className="flex items-center justify-between w-full px-4 py-2">
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold">Chat with me ✨</h1>
            <p className="text-sm text-muted-foreground">A.M.A - Ask Me Anything</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset Chat
          </Button>
        </ExpandableChatHeader>

        <ExpandableChatBody>
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src={
                    message.sender === "user"
                      ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop"
                      : "/profile.jpg"
                  }
                  fallback={message.sender === "user" ? "US" : "AI"}
                />
                {message.type === "gif" ? (
                  <ChatBubbleMessage variant="received" className="p-1 bg-transparent">
                    <img
                      src={message.src}
                      alt="AI GIF"
                      className="max-w-[200px] h-auto rounded-lg"
                    />
                  </ChatBubbleMessage>
                ) : message.content && message.content.includes('<b>') ? (
                  <ChatBubbleMessage
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    <span dangerouslySetInnerHTML={{ __html: message.content }} />
                  </ChatBubbleMessage>
                ) : (
                  <ChatBubbleMessage
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    {message.type === "image" ? (
                    <img src={message.content} alt={message.fileName || "image"} className="max-w-xs rounded-lg" />
                  ) : message.type === "audio" ? (
                    <audio
                      controls
                      src={message.content}
                      className={
                        "max-w-xs bg-transparent border-0 text-current "+
                        "[&::-webkit-media-controls-panel]:bg-transparent "+
                        "[&::-webkit-media-controls-panel]:border-0 "+
                        "[&::-webkit-media-controls-play-button]:bg-transparent "+
                        "[&::-webkit-media-controls-play-button]:text-current"
                      }
                    />
                  ) : (
                    message.content
                  )}
                  </ChatBubbleMessage>
                )}
              </ChatBubble>
            ))}

            {isLoading && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src="/profile.jpg"
                  fallback="AI"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
        </ExpandableChatBody>

        <ExpandableChatFooter>
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="flex items-center p-3 pt-0 justify-between">
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={handleAttachFile}
                >
                  <Paperclip className="size-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={handleMicrophoneClick}
                >
                  {isRecording ? (
                    <Square className="size-4 text-red-500 transition-all duration-500" fill="currentColor" />
                  ) : (
                    <Mic className="size-4 transition-all duration-500" />
                  )}
                </Button>
              </div>
              <Button type="submit" size="sm" className="ml-auto gap-1.5 bg-black text-white dark:bg-white dark:text-black">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </ExpandableChatFooter>
      </ExpandableChat>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  )
} 