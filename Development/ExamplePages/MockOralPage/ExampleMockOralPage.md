/*
 * Page: Mock Oral Page
 * Purpose: Simulates a mock oral check ride scenario with interactive questions and progress tracking.
 * Key Components:
 * 1. Scenario Sidebar: Displays scenario details and handles document uploads.
 * 2. Question Area: Manages user interactions with AI, uses existing `InputArea` and `Input` components.
 * 3. Progress Tracker: Tracks user progress through the mock oral exam.
 * 4. Generate Debriefing Button: Generates a detailed performance report.
 * Important: Use existing components where available (e.g., `InputArea`, `Input`, `Button`) to maintain consistency and avoid duplication.
*/

import React, { useState } from 'react';
import ScenarioSidebar from '@/components/MockOral/ScenarioSidebar';
import QuestionArea from '@/components/MockOral/QuestionArea';
import ProgressTracker from '@/components/MockOral/ProgressTracker';
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { PlaneTakeoff, Menu, Settings, Plus } from 'lucide-react';

const navItems = ["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"];
const stages = ["Private Pilot", "Instrument", "Commercial", "ATP"];
const topics = ["General", "Aerodynamics", "Navigation", "Weather", "Flight Maneuvers", "Regulations"];
const examiners = ["John Smith", "Jane Doe", "Robert Johnson"];
const mockOralExams = [
  { name: "Private Pilot Checkride", stage: "Private Pilot", topic: "General" },
  { name: "IFR Procedures Review", stage: "Instrument", topic: "Navigation" },
  { name: "Commercial Maneuvers", stage: "Commercial", topic: "Flight Maneuvers" },
];

const acsTopic = [
  { id: 1, name: "Pilot Qualifications", status: "completed" },
  { id: 2, name: "Airworthiness Requirements", status: "unsatisfactory" },
  { id: 3, name: "Weather Information", status: "unanswered" },
  { id: 4, name: "Cross-Country Flight Planning", status: "completed" },
  { id: 5, name: "Performance and Limitations", status: "unsatisfactory" },
  { id: 6, name: "Operation of Systems", status: "unanswered" },
  { id: 7, name: "Human Factors", status: "completed" },
  { id: 8, name: "Navigation Systems", status: "unanswered" },
];

export default function MockOralPage() {
  const [selectedStage, setSelectedStage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedExaminer, setSelectedExaminer] = useState("");
  const [showResources, setShowResources] = useState(false);

  const handleDocumentUpload = () => {
    console.log("Uploading document...");
    // Implement document upload logic here
  };

  const handleGenerateDebriefing = () => {
    console.log("Generating debriefing report...");
    // Implement debriefing report generation logic here
  };

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
            <SheetContent side="left" className="w-[300px] sm:w-[400px] flex flex-col">
              <h2 className="text-lg font-semibold mb-4">Mock Orals</h2>
              <Button className="mb-4">
                <Plus className="h-4 w-4 mr-2" />
                New Mock Oral
              </Button>
              <div className="space-y-2 mb-4">
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
                <Select onValueChange={setSelectedExaminer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Examiner" />
                  </SelectTrigger>
                  <SelectContent>
                    {examiners.map((examiner) => (
                      <SelectItem key={examiner} value={examiner}>{examiner}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <ScrollArea className="flex-grow">
                {mockOralExams
                  .filter(exam => 
                    (!selectedStage || exam.stage === selectedStage) &&
                    (!selectedTopic || exam.topic === selectedTopic)
                  )
                  .map((exam, index) => (
                    <Button key={index} variant="ghost" className="justify-start w-full mb-2">
                      {exam.name}
                    </Button>
                  ))
                }
              </ScrollArea>
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
              className={item === "Mock Oral" ? "text-sky-600" : ""}
            >
              {item}
            </Button>
          ))}
        </nav>
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <ScenarioSidebar 
          handleDocumentUpload={handleDocumentUpload} 
          handleGenerateDebriefing={handleGenerateDebriefing} 
        />
        <QuestionArea />
        <ProgressTracker acsTopic={acsTopic} />
      </div>
    </div>
  );
}