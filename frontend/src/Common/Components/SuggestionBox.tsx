import React from 'react';
import Button from './Button';

interface SuggestionBoxProps {

  suggestionTopics: { text: string; icon: React.ComponentType }[]; // icon is a React component type
  onSuggestionClick: (suggestion: string) => void;
  className?: string; // Add className prop
}

const SuggestionBox: React.FC<SuggestionBoxProps> = ({ suggestionTopics, onSuggestionClick, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {suggestionTopics.map((topic, index) => {
        const Icon = topic.icon; // Create an element from the component type
        return (
          <Button 
            key={index} 
            variant="outline" 
            onClick={() => onSuggestionClick(topic.text)} 
            className="w-full p-6 flex items-center justify-center space-x-2 bg-white shadow-md rounded-lg"
          >
            <span className="w-8 h-8 text-blue-500">
              <Icon /> {/* Render the icon component */}
            </span>
            <span className="text-lg font-medium">{topic.text}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default SuggestionBox;
