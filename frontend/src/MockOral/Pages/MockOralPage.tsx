import React, { useState, useEffect } from 'react';
import ScenarioSidebar from '../Components/ScenarioSidebar';
import QuestionArea from '../Components/QuestionArea';
import ProgressTracker from '../Components/ProgressTracker';
import Button from "../../Common/Components/Button";
import Sheet from "../../Common/Components/Sheet";
import SheetContent from "../../Common/Components/SheetContent";
import SheetTrigger from "../../Common/Components/SheetTrigger";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Common/Components/Select";
import { PlaneTakeoff, Menu, Settings, Plus } from 'lucide-react';
import api from '../../utils/api';
import { MockOralSession, Topic } from '../mockOralTypes';

const navItems = ["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"];
const stages = ["Private Pilot", "Instrument", "Commercial", "ATP"];
const topics = ["General", "Aerodynamics", "Navigation", "Weather", "Flight Maneuvers", "Regulations"];
const examiners = ["John Smith", "Jane Doe", "Robert Johnson"];

const acsTopic: Topic[] = [
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
  const [sessions, setSessions] = useState<MockOralSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<MockOralSession | null>(null);
  const [currentTopics, setCurrentTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await api.get('/mockoral/sessions/');
      setSessions(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching mock oral sessions:', error);
      setError('Failed to load mock oral sessions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = () => {
    console.log("Uploading document...");
    // Implement document upload logic here
  };

  const handleGenerateDebriefing = () => {
    console.log("Generating debriefing report...");
    // Implement debriefing report generation logic here
  };

  const startNewSession = async () => {
    try {
      setLoading(true);
      const response = await api.post('/mockoral/sessions/', {
        examiner_name: selectedExaminer,
        stage: selectedStage,
        topic: selectedTopic,
      });
      setCurrentSession(response.data);
      setCurrentTopics(acsTopic.map(topic => ({ ...topic, status: 'unanswered' })));
      setError(null);
    } catch (error) {
      console.error('Error starting new session:', error);
      setError('Failed to start new session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSession = async (sessionId: number) => {
    try {
      setLoading(true);
      const response = await api.get(`/mockoral/sessions/${sessionId}/`);
      setCurrentSession(response.data);
      setCurrentTopics(response.data.topics);
      setError(null);
    } catch (error) {
      console.error('Error loading session:', error);
      setError('Failed to load session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateTopicStatus = (topicId: number, status: 'completed' | 'unsatisfactory' | 'unanswered') => {
    setCurrentTopics(prevTopics =>
      prevTopics.map(topic =>
        topic.id === topicId ? { ...topic, status } : topic
      )
    );
  };

  const saveSession = async () => {
    if (!currentSession) return;

    try {
      setLoading(true);
      await api.put(`/mockoral/sessions/${currentSession.id}/`, {
        ...currentSession,
        topics: currentTopics,
      });
      setError(null);
    } catch (error) {
      console.error('Error saving session:', error);
      setError('Failed to save session. Please try again.');
    } finally {
      setLoading(false);
    }
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
              {/* Display mock oral sessions */}
              {sessions.map((session) => (
                <Button key={session.id} variant="ghost" className="justify-start w-full mb-2">
                  {session.examiner_name} - {new Date(session.created_at).toLocaleDateString()}
                </Button>
              ))}
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
        <QuestionArea 
          currentSession={currentSession} 
          updateTopicStatus={updateTopicStatus}
        />
        <ProgressTracker 
          acsTopic={acsTopic} 
          currentSession={currentTopics}
        />
      </div>
      {currentSession && (
        <Button onClick={saveSession} className="m-4">
          Save Session
        </Button>
      )}
      {error && <div className="text-red-500 text-center p-2">{error}</div>}
    </div>
  );
}