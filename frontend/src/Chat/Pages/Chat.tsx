import React, { useState } from 'react';
import Button from "../../Common/Components/Button";
import ScrollArea from "../../Common/Components/ScrollArea";
import Sheet from "../../Common/Components/Sheet";
import SheetContent from "../../Common/Components/SheetContent";
import SheetTrigger from "../../Common/Components/SheetTrigger";
import { 
  PlaneTakeoff, User, Bot, Settings, Menu,
  BookOpen, Brain, Compass, CloudLightning, AlertTriangle, Zap,
  LucideIcon
} from 'lucide-react';

import Header from '../../Common/Components/Header';
import Footer from '../../Common/Components/Footer';
import MessageArea from '../Components/ChatMessageArea';
import InputComponent from '../../Chat/Components/InputArea';
import ReferenceCarousel from '../../Chat/Components/ReferenceCarousel';
import { Message } from '../../Chat/chatTypes';
import { Reference } from '../../types/generalTypes';
import api from '../../utils/api';
import { convertStringToReference, generateId } from '../../utils/utils';
import { extractTitle, extractContent } from '../../utils/extractors';

const suggestionTopics = [
  { text: "Practice Popular Aviation Mnemonics", icon: BookOpen },
  { text: "Identify Areas of Weakness", icon: Brain },
  { text: "PPL Related Topics", icon: Compass },
  { text: "Learn IFR Procedures", icon: CloudLightning },
  { text: "Review Emergency Procedures", icon: AlertTriangle },
  { text: "Explore Aviation Weather", icon: Zap }
];

const navItems = ["Profile", "Chat", "Flash Cards", "Mock Oral", "Gouge"];

const placeholderConversations = [
  "Weather Patterns Discussion",
  "Navigation Techniques",
  "Aircraft Systems Overview",
  "Flight Planning Strategies",
  "Emergency Procedures Review"
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showReferences, setShowReferences] = useState(false);
  const [showReferenceCarousel, setShowReferenceCarousel] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Reference | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceBoxes, setReferenceBoxes] = useState<Reference[]>([]);

  const handleSendMessage = async (content: string) => {
    if (content.trim()) {
      const newMessage: Message = { type: 'user', content };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputValue('');
      setShowReferences(true);
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post('/api/chat/weaviate', { query: content });
        const aiMessage: Message = { type: 'ai', content: response.data.answer };
        setMessages(prevMessages => [...prevMessages, aiMessage]);

        if (response.data.references) {
          setReferenceBoxes(response.data.references);
          setShowReferences(true);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
        const errorMessage: Message = { type: 'error', content: "Sorry, I encountered an error. Please try again." };
        setMessages(prevMessages => [...prevMessages, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const clearChat = () => {
    setMessages([]);
    setShowReferences(false);
    setError(null);
  };

  const handleResourceClick = (resource: string) => {
    const reference: Reference = {
      id: generateId(),
      title: extractTitle(resource) || 'Untitled',
      content: extractContent(resource) || '',
      icon: BookOpen as LucideIcon,
      type: 'common',
    };
    setSelectedResource(reference);
  };

  const handleAskFollowUp = () => {
    setShowReferenceCarousel(false);
    setInputValue(`Follow up question about ${selectedResource?.title}: `);
  };

  const handleCreateFlashcards = () => {
    console.log(`Creating flashcards for ${selectedResource?.title || 'the selected topic'}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header navItems={navItems} placeholderConversations={placeholderConversations} />
      
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
            <MessageArea messages={messages} isLoading={isLoading} error={error} />
          )}
        </ScrollArea>

        {error && <div className="text-center text-red-500">{error}</div>}

        {showReferenceCarousel && (
          <ReferenceCarousel
            referenceBoxes={referenceBoxes}
            selectedResource={selectedResource}
            onResourceClick={handleResourceClick}
            onClose={() => setShowReferenceCarousel(false)}
            onAskFollowUp={handleAskFollowUp}
            onCreateFlashcards={handleCreateFlashcards}
          />
        )}

        <InputComponent
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleSendMessage={handleSendMessage}
          showReferences={showReferences}
          onShowReferences={() => setShowReferenceCarousel(true)}
          isLoading={isLoading}
        />
      </main>

      <Footer clearChat={clearChat} />
    </div>
  );
}

export default Chat;