import React, { useState } from "react";
import { Send } from "lucide-react";

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
];

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to get a random positive response
  const getRandomPositiveResponse = () => {
    const randomIndex = Math.floor(Math.random() * positiveResponses.length);
    return positiveResponses[randomIndex];
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay (0.5-1.5 seconds)
    setTimeout(
      () => {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: getRandomPositiveResponse(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
      },
      500 + Math.random() * 1000
    );
  };

  return (
    <div className="flex flex-col h-screen p-4">
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg">
        {messages.length === 0 ? (
          <div className="text-center my-8 p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Welcome to SupportPulse</h3>
            <p className="text-gray-500">Send a message to start the conversation with your AI assistant</p>
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role !== "user" && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-none"
                    : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center ml-2 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
              )}
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
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 border border-gray-300 rounded-lg p-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 outline-none bg-transparent px-3 py-2"
        />
        <button
          type="submit"
          className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white disabled:opacity-50 hover:shadow-lg transition-all duration-200"
          disabled={isLoading || !input.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
