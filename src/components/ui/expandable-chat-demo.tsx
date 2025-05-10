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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "This is an AI response to your message.",
          sender: "ai",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, content: url, sender: "user", type: "image", fileName: file.name }
    ])
    setIsLoading(true)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content: "This is an AI response to your message.",
          sender: "ai",
        },
      ])
      setIsLoading(false)
    }, 1000)
    e.target.value = ""
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
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
          const audioUrl = URL.createObjectURL(audioBlob)
          setMessages(prev => [
            ...prev,
            { id: prev.length + 1, content: audioUrl, sender: "user", type: "audio" }
          ])
          stream.getTracks().forEach(track => track.stop())
          setIsLoading(true)
          setTimeout(() => {
            setMessages(prev => [
              ...prev,
              {
                id: prev.length + 1,
                content: "This is an AI response to your message.",
                sender: "ai",
              },
            ])
            setIsLoading(false)
          }, 1000)
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
                    <audio controls src={message.content} className="max-w-xs" />
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