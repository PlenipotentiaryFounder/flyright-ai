import React, { useState } from 'react';
import Button from "../../Common/Components/Button";
import { Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { FlashcardSet, FlashcardCategory } from '../flashcardTypes';

// Props for the Sidebar component
interface FlashcardSidebarProps {
  categories: FlashcardCategory[];
  organizedSets: {
    flyright: Record<number, FlashcardSet[]>;
    user: Record<number, FlashcardSet[]>;
  };
  onAddSet?: () => void;
  onSelectSet: (setId: number) => void;
  flashcardCounts: { [setId: number]: number };
}

const FlashcardSidebar: React.FC<FlashcardSidebarProps> = ({
  categories,
  organizedSets,
  onAddSet,
  onSelectSet,
  flashcardCounts
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const renderSet = (set: FlashcardSet) => (
    <Button 
      key={set.id} 
      variant="ghost" 
      className="justify-start pl-8" 
      onClick={() => onSelectSet(set.id)}
    >
      {set.name} ({flashcardCounts[set.id] || 0} cards)
    </Button>
  );

  const renderCategory = (category: FlashcardCategory, sets: FlashcardSet[]) => (
    <div key={category.id} className="mb-2">
      <Button 
        variant="ghost" 
        className="justify-start w-full"
        onClick={() => toggleCategory(category.id)}
      >
        {expandedCategories[category.id] ? <ChevronDown className="mr-2" /> : <ChevronRight className="mr-2" />}
        {category.name}
      </Button>
      {expandedCategories[category.id] && sets.map(renderSet)}
    </div>
  );

  console.log('FlashcardSidebar props:', { categories, organizedSets, flashcardCounts });

  return (
    <aside className="w-64 bg-white p-4 hidden md:block">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Flashcard Sets</h2>
        {onAddSet && (
          <Button variant="ghost" size="icon" onClick={onAddSet} aria-label="Add new set">
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      <nav className="flex flex-col space-y-4">
        <h3 className="text-sm font-medium text-gray-500">FlyRight Flashcard Sets</h3>
        {categories
          .filter(category => category.creatorType === 'flyright')
          .map(category => renderCategory(category, organizedSets.flyright[category.id] || []))}
        <div className="border-t border-gray-200 my-4"></div>
        <h3 className="text-sm font-medium text-gray-500">My Flashcard Sets</h3>
        {categories
          .filter(category => category.creatorType === 'user')
          .map(category => renderCategory(category, organizedSets.user[category.id] || []))}
      </nav>
    </aside>
  );
};

export default FlashcardSidebar;
