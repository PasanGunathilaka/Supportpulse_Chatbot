import React, { useState, FormEvent as ReactFormEvent } from "react"
import { Send } from "lucide-react"

// Message type definition
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

// Array of positive responses
const positiveResponses = [
  "That's fantastic! I'm here to help with anything you need.",
  "Great question! I'm happy to assist you.",
  "That sounds like a wonderful idea.",
  "I'm excited about what you're working on! Let's make it happen.",
  "That's a positive direction! I'm here to support you.",
  "I love your enthusiasm! Let's keep that energy going.",
  "You're doing great! Keep up the excellent work.",
  "I appreciate your question! Let's find the best solution together.",
  "That's a brilliant thought! I'm glad you shared it.",
  "I'm optimistic about this! Let's move forward together.",
]

export default function ChatbotUI() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Function to get a random positive response
  const getRandomPositiveResponse = () => {
    const randomIndex = Math.floor(Math.random() * positiveResponses.length)
    return positiveResponses[randomIndex]
  }

  // Handle form submission
  const handleSubmit = (e: ReactFormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay (0.5-1.5 seconds)
    setTimeout(
      () => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getRandomPositiveResponse(),
        }

        setMessages((prev) => [...prev, botMessage])
        setIsLoading(false)
      },
      500 + Math.random() * 1000,
    )
  }

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Chatbot</h1>

      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg border border-gray-200">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 my-8">Send a message to start the conversation</div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-500 text-white rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 text-gray-800 rounded-tl-none">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 border border-gray-300 rounded-lg p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 outline-none bg-transparent"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-500 text-white disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
