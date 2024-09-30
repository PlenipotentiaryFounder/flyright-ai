import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  PlaneTakeoff, Menu, Settings, ChevronLeft, ChevronRight, Zap, Underline, MessageSquare, RotateCw, FileText
} from 'lucide-react'

const navItems = ["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"]

const userFlashcardSets = [
  "My PPL Set",
  "IFR Procedures",
  "Aircraft Systems",
]

const curatedFlashcardSets = [
  { name: "Aerodynamics Basics", stage: "Private Pilot", topic: "Aerodynamics" },
  { name: "Weather Patterns", stage: "Private Pilot", topic: "Meteorology" },
  { name: "IFR Navigation", stage: "Instrument", topic: "Navigation" },
  { name: "Commercial Maneuvers", stage: "Commercial", topic: "Flight Maneuvers" },
]

const stages = ["Private Pilot", "Instrument", "Commercial", "ATP"]
const topics = ["Aerodynamics", "Navigation", "Meteorology", "Flight Maneuvers", "Regulations"]

export default function FlashcardsPage() {
  const [selectedSet, setSelectedSet] = useState(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedStage, setSelectedStage] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")

  const [flashcards] = useState([
    { front: "What is the purpose of ailerons?", back: "Ailerons control roll of the aircraft" },
    { front: "What does AGL stand for?", back: "Above Ground Level" },
    // Add more flashcards as needed
  ])

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1)
      setIsFlipped(false)
    }
  }

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
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
                <h2 className="text-lg font-semibold mb-4">Your Flashcard Sets</h2>
                {userFlashcardSets.map((set, index) => (
                  <Button key={index} variant="ghost" className="justify-start">
                    {set}
                  </Button>
                ))}
                <h2 className="text-lg font-semibold mt-8 mb-4">FlyRight Flashcard Sets</h2>
                <div className="space-y-2">
                  <Select onValueChange={setSelectedStage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSelectedTopic}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <ScrollArea className="h-[300px] mt-4">
                  {curatedFlashcardSets
                    .filter(set => 
                      (!selectedStage || set.stage === selectedStage) &&
                      (!selectedTopic || set.topic === selectedTopic)
                    )
                    .map((set, index) => (
                      <Button key={index} variant="ghost" className="justify-start w-full">
                        {set.name}
                      </Button>
                    ))
                  }
                </ScrollArea>
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
              className={item === "Flash Cards" ? "text-sky-600" : ""}
            >
              {item}
            </Button>
          ))}
        </nav>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 relative">
        <div className="absolute top-4 right-4 text-sm font-medium text-gray-500">
          {currentCardIndex + 1} / {flashcards.length} completed
        </div>

        <Card className="w-full max-w-2xl h-64 flex flex-col justify-center items-center p-6 mb-8">
          <div className="text-2xl font-semibold mb-4">
            {isFlipped ? flashcards[currentCardIndex].back : flashcards[currentCardIndex].front}
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Zap className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Underline className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleFlip}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        <div className="flex justify-between w-full max-w-2xl mb-8">
          <Button size="lg" onClick={handlePrevCard} disabled={currentCardIndex === 0}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button size="lg" onClick={handleNextCard} disabled={currentCardIndex === flashcards.length - 1}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <Card className="w-full max-w-2xl p-4">
          <h3 className="font-semibold mb-2">Explanation</h3>
          <p className="text-sm text-gray-600 mb-4">
            Additional explanation or context for the current flashcard would go here.
          </p>
          <Button variant="outline" className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Resources
          </Button>
        </Card>
      </main>
    </div>
  )
}