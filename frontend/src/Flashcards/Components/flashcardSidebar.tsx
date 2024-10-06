import React from 'react';
import Button from "../../Common/Components/Button";
import { Plus } from 'lucide-react';
import { FlashcardSet } from '../flashcardTypes';

// Props for the Sidebar component
interface FlashcardSidebarProps {
  title: string;
  sections: {
    title: string;
    items: FlashcardSet[];
  }[];
  onAddSet?: () => void;
  onSelectSet: (setId: number) => void;
  flashcardCounts: { [setId: number]: number };
}

const FlashcardSidebar: React.FC<FlashcardSidebarProps> = ({ title, sections, onAddSet, onSelectSet, flashcardCounts }) => {
  const renderItem = (item: FlashcardSet) => (
    <Button 
      key={item.id} 
      variant="ghost" 
      className="justify-start" 
      onClick={() => onSelectSet(item.id)}
    >
      {item.name} ({flashcardCounts[item.id] || 0} cards)
      {item.creatorType === 'flyright' && (
        <span className="ml-2 text-xs text-blue-500">FlyRight</span>
      )}
    </Button>
  );

  return (
    <aside className="w-64 bg-white p-4 hidden md:block">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onAddSet && (
          <Button variant="ghost" size="icon" onClick={onAddSet} aria-label="Add new set">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      <nav className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <h3 className="text-sm font-medium text-gray-500">{section.title}</h3>
            {section.items.map(renderItem)}
            {index < sections.length - 1 && <div className="border-t border-gray-200 my-2"></div>}
          </React.Fragment>
        ))}
      </nav>
    </aside>
  );
};

export default FlashcardSidebar;
