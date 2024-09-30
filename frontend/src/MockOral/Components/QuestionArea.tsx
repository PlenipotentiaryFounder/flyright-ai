import React, { useState } from 'react';
import { Input } from "../../Common/Components/Input";
import Button from "../../Common/Components/Button";
import ScrollArea from "../../Common/Components/ScrollArea";
import { User, Bot, AlertCircle } from 'lucide-react';
import api from '../../utils/api';
import { MockOralSession, Topic } from '../mockOralTypes';

interface Message {
  type: 'user' | 'ai' | 'error';
  content: string;
  topic?: string;
  difficulty?: string;
}

interface QuestionAreaProps {
  currentSession: MockOralSession | null;
  updateTopicStatus: (topicId: number, status: 'completed' | 'unsatisfactory' | 'unanswered') => void;
}

const QuestionArea: React.FC<QuestionAreaProps> = ({ currentSession, updateTopicStatus }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', content: inputValue }]);
      setInputValue('');
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.post('/api/mockoral/weaviate', { query: inputValue });
        const aiMessage: Message = { 
          type: 'ai', 
          content: response.data.answer,
          topic: response.data.topic,
          difficulty: response.data.difficulty
        };
        setMessages((prev) => [...prev, aiMessage]);

        // Update topic status based on AI response
        if (aiMessage.topic && currentSession?.topics) {
          const topic = currentSession.topics.find((t: Topic) => t.name === aiMessage.topic);
          if (topic) {
            updateTopicStatus(topic.id, 'completed');
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to get a response. Please try again.");
        setMessages((prev) => [...prev, { type: 'error', content: "Sorry, I encountered an error. Please try again." }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="flex-1 flex flex-col p-4 overflow-hidden">
      <ScrollArea className="flex-grow mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`rounded-full p-2 ${message.type === 'user' ? 'bg-sky-600' : message.type === 'error' ? 'bg-red-500' : 'bg-gray-200'}`}>
                {message.type === 'user' ? <User className="h-5 w-5 text-white" /> : 
                 message.type === 'error' ? <AlertCircle className="h-5 w-5 text-white" /> :
                 <Bot className="h-5 w-5 text-sky-600" />}
              </div>
              <div className={`rounded-lg p-3 max-w-md ${
                message.type === 'user' ? 'bg-sky-600 text-white' : 
                message.type === 'error' ? 'bg-red-100 text-red-800 border border-red-300' :
                'bg-white border border-gray-200'
              }`}>
                {message.content}
                {message.topic && <p className="text-xs mt-1">Topic: {message.topic}</p>}
                {message.difficulty && <p className="text-xs">Difficulty: {message.difficulty}</p>}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="flex space-x-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your answer here..."
          className="flex-grow"
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          disabled={isLoading || !currentSession}
        />
        <Button 
          onClick={handleSendMessage} 
          className="bg-sky-600 hover:bg-sky-700 text-white"
          disabled={isLoading || !currentSession}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </main>
  );
};

export default QuestionArea;