import React from 'react';
import { Message } from '@/Chat/chatTypes'; // Assuming types are defined

interface MessageAreaProps {
  messages: Message[];
  className?: string; // Add className prop
}

const MessageArea: React.FC<MessageAreaProps> = ({ messages, className }) => {
  return (
    <div className={className}>
      {messages.map((message, index) => (
        <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
          <div className={`rounded-lg p-3 ${message.type === 'user' ? 'bg-sky-600 text-white' : 'bg-white border'}`}>
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageArea;
