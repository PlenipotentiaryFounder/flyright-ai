import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  PlaneTakeoff, User, Bot, Settings, Trash2, ChevronLeft, ChevronRight, Menu,
  BookOpen, Brain, Compass, CloudLightning, FileText, Book, Briefcase, AlertTriangle,
  Zap, Headphones, X, MessageSquarePlus, Plus
} from 'lucide-react'

const suggestionTopics = [
  { text: "Practice Popular Aviation Mnemonics", icon: BookOpen },
  { text: "Identify Areas of Weakness", icon: Brain },
  { text: "PPL Related Topics", icon: Compass },
  { text: "Learn IFR Procedures", icon: CloudLightning },
  { text: "Review Emergency Procedures", icon: AlertTriangle },
  { text: "Explore Aviation Weather", icon: Zap }
]

const referenceBoxes = [
  { type: "Critical Reference", title: "FAA Pilot's Handbook", icon: Book, content: "This is the content of FAA Pilot's Handbook..." },
  { type: "Contextual Information", title: "AIM Chapter 5", icon: FileText, content: "This is the content of AIM Chapter 5..." },
  { type: "Popular Guide", title: "Private Pilot ACS", icon: Briefcase, content: "This is the content of Private Pilot ACS..." },
  { type: "Critical Reference", title: "FAR Part 91", icon: AlertTriangle, content: "This is the content of FAR Part 91..." },
]

const navItems = ["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"]

const placeholderConversations = [
  "Weather Patterns Discussion",
  "Navigation Techniques",
  "Aircraft Systems Overview",
  "Flight Planning Strategies",
  "Emergency Procedures Review"
]

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [showReferences, setShowReferences] = useState(false)
  const [showReferenceCarousel, setShowReferenceCarousel] = useState(false)
  const [selectedResource, setSelectedResource] = useState(referenceBoxes[0])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', content: inputValue }])
      setInputValue('')
      setShowReferences(true)
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'ai', content: "Here's a simulated response from FlyRight AI." }])
      }, 1000)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion)
    handleSendMessage()
  }

  const clearChat = () => {
    setMessages([])
    setShowReferences(false)
  }

  const handleResourceClick = (resource) => {
    setSelectedResource(resource)
  }

  const handleAskFollowUp = () => {
    setShowReferenceCarousel(false)
    setInputValue(`Follow up question about ${selectedResource.title}: `)
  }

  const handleCreateFlashcards = () => {
    // Implement flashcard creation logic here
    console.log(`Creating flashcards for ${selectedResource.title}`)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                <h2 className="text-lg font-semibold mb-4">Your Conversations</h2>
                {placeholderConversations.map((convo, index) => (
                  <Button key={index} variant="ghost" className="justify-start">
                    {convo}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center space-x-2">
            <PlaneTakeoff className="h-6 w-6 text-sky-600" />
            <span className="text-xl font-semibold text-sky-700">FlyRight AI</span>
          </div>
        </div>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={item === "Chat" ? "text-sky-600" : ""}
            >
              {item}
            </Button>
          ))}
        </nav>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-grow flex flex-col p-4 space-y-4 overflow-hidden relative">
        <ScrollArea className="flex-grow">
          {messages.length === 0 ? (
            <div className="flex flex-wrap justify-center gap-4 mb-8 mt-24">
              {suggestionTopics.map((topic, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="bg-white hover:bg-sky-50 p-4 h-auto w-[calc(33.333%-1rem)] flex flex-col items-center text-center shadow-md hover:shadow-lg transition-all"
                  onClick={() => handleSuggestionClick(topic.text)}
                >
                  <topic.icon className="h-8 w-8 mb-2 text-sky-600" />
                  <span className="text-sm">{topic.text}</span>
                </Button>
              ))}
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`rounded-full p-2 ${message.type === 'user' ? 'bg-sky-600' : 'bg-gray-200'}`}>
                    {message.type === 'user' ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-sky-600" />}
                  </div>
                  <div className={`rounded-lg p-3 max-w-md ${message.type === 'user' ? 'bg-sky-600 text-white' : 'bg-white border border-gray-200'}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>

        {showReferenceCarousel && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-6xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Resources</h3>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowReferenceCarousel(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-grow">
                <div className="w-1/3 pr-4 border-r border-gray-200">
                  <ScrollArea className="h-full">
                    {referenceBoxes.map((ref, index) => (
                      <Card 
                        key={index} 
                        className={`p-3 mb-2 cursor-pointer ${selectedResource === ref ? 'bg-sky-100' : 'bg-white'}`}
                        onClick={() => handleResourceClick(ref)}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <ref.icon className="h-4 w-4 text-sky-600" />
                          <p className="text-xs text-sky-600 font-semibold truncate">{ref.type}</p>
                        </div>
                        <h3 className="text-sm font-medium truncate">{ref.title}</h3>
                      </Card>
                    ))}
                  </ScrollArea>
                </div>
                <div className="w-2/3 pl-4 flex flex-col">
                  <div className="flex justify-end space-x-2 mb-2">
                    <Button onClick={handleAskFollowUp} className="bg-sky-600 hover:bg-sky-700 text-white">
                      <MessageSquarePlus className="h-4 w-4 mr-2" />
                      Ask Follow Up
                    </Button>
                    <Button onClick={handleCreateFlashcards} variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Flashcards
                    </Button>
                  </div>
                  <ScrollArea className="flex-grow">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">{selectedResource.title}</h4>
                      <p>{selectedResource.content}</p>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          {showReferences && !showReferenceCarousel && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowReferenceCarousel(true)}
              className="bg-white mr-2"
            >
              Show Resources
            </Button>
          )}
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask FlyRight AI a question..."
            className="flex-grow"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} className="bg-sky-600 hover:bg-sky-700 text-white">Send</Button>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
        <p className="text-xs text-gray-500">FlyRight AI makes mistakes. Use discretion when reviewing information.</p>
        <Button variant="ghost" size="sm" onClick={clearChat} className="text-gray-500">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Chat
        </Button>
      </footer>
    </div>
  )
}