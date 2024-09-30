import React from 'react';
import { Message } from '../chatTypes';
import { User, Bot, Loader, AlertCircle } from 'lucide-react';

interface MessageAreaProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages, isLoading, error }) => {
  return (
    <div>
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
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <Loader className="h-6 w-6 animate-spin text-sky-600" />
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 mt-4">
          <AlertCircle className="h-5 w-5 inline-block mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};

export default MessageArea;