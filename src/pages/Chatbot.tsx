import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Navbar } from "@/components/navbar"
import { Send, Bot, User, Calendar, Heart, Clock } from "lucide-react"
import { Link } from "react-router-dom"

interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI wellness companion. I'm here to listen and provide support whenever you need it. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getBotResponse = (userInput: string): string => {
    const responses = [
      "I understand you're going through a difficult time. It takes courage to reach out for support. Can you tell me more about what's been on your mind?",
      "Thank you for sharing that with me. Your feelings are completely valid. Would you like to explore some coping strategies that might help?",
      "It sounds like you're dealing with a lot right now. Remember that seeking help is a sign of strength. Have you considered speaking with a professional counselor?",
      "I hear you, and I want you to know that you're not alone in feeling this way. Many students face similar challenges. What usually helps you feel a bit better?",
      "That must be really challenging for you. Sometimes talking through our thoughts can help us process them better. Would you like to try a mindfulness exercise together?"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const quickResponses = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I need someone to talk to"
  ]

  return (
    <div className="min-h-screen bg-background theme-transition">
      <Navbar />
      <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background theme-transition">
        <AppSidebar />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/40 z-40">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-primary p-2 rounded-xl">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">AI Wellness Support</h1>
                    <p className="text-sm text-muted-foreground">Available 24/7 for confidential support</p>
                  </div>
                </div>
              </div>
              <Link to="/booking">
                <Button className="wellness-gradient hover-glow">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Counselor
                </Button>
              </Link>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-auto custom-scrollbar p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Welcome Card */}
              <Card className="glass-card border-0">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-primary p-2 rounded-xl">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Your Safe Space</CardTitle>
                      <p className="text-sm text-muted-foreground">Everything you share here is confidential</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Messages */}
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs md:max-w-md lg:max-w-lg ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-gradient-primary'
                      }`}>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-white" />
                        )}
                      </div>
                      
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'chat-bubble-user'
                          : 'chat-bubble-bot'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="flex items-center mt-2 space-x-1 text-xs opacity-70">
                          <Clock className="h-3 w-3" />
                          <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="chat-bubble-bot">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Responses */}
              {messages.length === 1 && (
                <Card className="glass-card border-0">
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-3">Quick responses to get started:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {quickResponses.map((response, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="glass-button text-left justify-start h-auto p-3 text-sm"
                          onClick={() => setInput(response)}
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border/40 bg-background/80 backdrop-blur-sm p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex space-x-4">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message here... I'm here to listen."
                  className="flex-1 glass-card border-0 text-base py-3"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="wellness-gradient hover-glow px-6"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This AI provides support but is not a replacement for professional mental health care.
              </p>
            </div>
          </div>
        </main>
      </div>
      </SidebarProvider>
    </div>
  )
}