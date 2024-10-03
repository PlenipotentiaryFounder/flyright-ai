import React from 'react';
import Button from '../../Common/Components/Button';
import { X } from 'lucide-react';

interface ConversationsMenuProps {
  conversations: string[];
  onClose: () => void;
}

const ConversationsMenu: React.FC<ConversationsMenuProps> = ({ conversations, onClose }) => {
  return (
    <div className="w-1/5 bg-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Your Conversations</h3>
        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {conversations.map((convo, index) => (
          <Button key={index} variant="ghost" className="w-full text-left mb-2">
            {convo}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ConversationsMenu;