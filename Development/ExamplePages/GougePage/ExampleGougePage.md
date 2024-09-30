import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PlaneTakeoff, Search, MapPin, User, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp,
  Bookmark, PlusCircle, Settings
} from 'lucide-react'

const navItems = ["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"]

const stages = ["Private Pilot", "Instrument", "Commercial", "ATP"]

const examiners = [
  { id: 1, name: "John Smith", location: "New York, NY", snippet: "Experienced examiner with a focus on safety procedures." },
  { id: 2, name: "Jane Doe", location: "Los Angeles, CA", snippet: "Known for thorough oral examinations and challenging maneuvers." },
  { id: 3, name: "Robert Johnson", location: "Chicago, IL", snippet: "Fair and consistent examiner with a calm demeanor." },
]

const gouges = [
  { id: 1, date: "2023-09-15", outcome: "pass", text: "The examiner was thorough but fair. Focused heavily on emergency procedures during the oral portion." },
  { id: 2, date: "2023-08-30", outcome: "fail", text: "Challenging flight portion. Make sure to practice steep turns and soft-field landings." },
  { id: 3, date: "2023-08-10", outcome: "pass", text: "Straightforward checkride. Examiner was friendly and put me at ease. Review your weather knowledge." },
]

const DifficultyBadge = ({ level }) => {
  const colors = {
    Easy: "bg-green-100 text-green-800",
    Moderate: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800"
  }
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${colors[level]}`}>
      {level}
    </span>
  )
}

export default function GougePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState("")
  const [selectedExaminer, setSelectedExaminer] = useState(null)
  const [expandedGouges, setExpandedGouges] = useState<number[]>([])

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching for:", searchTerm)
  }

  const handleExaminerSelect = (examiner) => {
    setSelectedExaminer(examiner)
  }

  const toggleGouge = (gougeId: number) => {
    setExpandedGouges(prev => 
      prev.includes(gougeId) 
        ? prev.filter(id => id !== gougeId)
        : [...prev, gougeId]
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlaneTakeoff className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-semibold text-sky-700">FlyRight AI</span>
        </div>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={item === "Gouge" ? "text-sky-600" : ""}
            >
              {item}
            </Button>
          ))}
        </nav>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-grow p-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex space-x-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search examiners by name or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select onValueChange={setSelectedStage}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map((stage) => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleSearch} className="bg-sky-600 hover:bg-sky-700 text-white">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          <div className="flex space-x-6">
            <div className="w-1/3">
              <h2 className="text-lg font-semibold mb-4">Examiners</h2>
              <ScrollArea className="h-[calc(100vh-200px)]">
                {examiners.map((examiner) => (
                  <Card 
                    key={examiner.id} 
                    className={`p-4 mb-4 cursor-pointer ${selectedExaminer?.id === examiner.id ? 'border-sky-600' : ''}`}
                    onClick={() => handleExaminerSelect(examiner)}
                  >
                    <h3 className="font-semibold">{examiner.name}</h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {examiner.location}
                    </p>
                    <p className="text-sm mt-2">{examiner.snippet}</p>
                  </Card>
                ))}
              </ScrollArea>
            </div>

            {selectedExaminer && (
              <div className="w-2/3">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <Card className="p-6">
                    <div className="flex items-start mb-6">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mr-6 flex items-center justify-center">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedExaminer.name}</h2>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {selectedExaminer.location}
                        </p>
                        <p className="mt-2">Years of Experience: 15</p>
                        <p className="mt-1">Conducts check rides for: Private Pilot, Instrument</p>
                      </div>
                    </div>

                    <Tabs defaultValue="overview">
                      <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="gouges">Recent Gouges</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <div className="grid grid-cols-2 gap-6 mt-4">
                          <div>
                            <h3 className="font-semibold mb-2">Oral Portion Summary</h3>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Difficulty:</span>
                              <DifficultyBadge level="High" />
                            </div>
                            <p className="text-sm">Known for thorough questioning on regulations and weather interpretation. Expects detailed answers and practical application of knowledge.</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Flight Portion Summary</h3>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Difficulty:</span>
                              <DifficultyBadge level="Moderate" />
                            </div>
                            <p className="text-sm">Emphasizes precision in maneuvers and adherence to ACS standards. Expect challenging scenarios during the flight, particularly in emergency procedures and navigation.</p>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h3 className="font-semibold mb-2">Pass/Fail Overview</h3>
                          <div className="flex space-x-4">
                            <div className="flex-1 bg-green-100 p-4 rounded-lg text-center">
                              <p className="text-lg font-semibold text-green-700">75%</p>
                              <p className="text-sm text-green-600">Overall Pass Rate</p>
                            </div>
                            <div className="flex-1 bg-blue-100 p-4 rounded-lg text-center">
                              <p className="text-lg font-semibold text-blue-700">80%</p>
                              <p className="text-sm text-blue-600">Oral Pass Rate</p>
                            </div>
                            <div className="flex-1 bg-purple-100 p-4 rounded-lg text-center">
                              <p className="text-lg font-semibold text-purple-700">70%</p>
                              <p className="text-sm text-purple-600">Flight Pass Rate</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <h3 className="font-semibold mb-2">Areas of Focus</h3>
                          <ul className="list-disc list-inside text-sm">
                            <li>Thorough knowledge of airspace regulations</li>
                            <li>Proficiency in emergency procedures</li>
                            <li>Accurate weight and balance calculations</li>
                            <li>Precision in soft-field takeoffs and landings</li>
                          </ul>
                        </div>
                      </TabsContent>
                      <TabsContent value="gouges">
                        <ScrollArea className="h-[400px] mt-4">
                          {gouges.map((gouge) => (
                            <Card key={gouge.id} className="p-4 mb-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm text-gray-600">{gouge.date}</p>
                                  <p className={`font-semibold ${gouge.outcome === 'pass' ? 'text-green-600' : 'text-red-600'}`}>
                                    {gouge.outcome.toUpperCase()}
                                  </p>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => toggleGouge(gouge.id)}>
                                  {expandedGouges.includes(gouge.id) ? <ChevronUp /> : <ChevronDown />}
                                </Button>
                              </div>
                              <p className={`mt-2 text-sm ${expandedGouges.includes(gouge.id) ? '' : 'line-clamp-2'}`}>
                                {gouge.text}
                              </p>
                              <div className="mt-2 flex items-center space-x-4">
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Helpful
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Not Helpful
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </ScrollArea>
                      </TabsContent>
                    </Tabs>

                    <div className="mt-6 flex justify-between">
                      <Button variant="outline">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save Examiner
                      </Button>
                      <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Your Gouge
                      </Button>
                    </div>
                  </Card>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}