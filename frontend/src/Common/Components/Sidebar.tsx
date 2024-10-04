import React from 'react';
import Button from "./Button";
import { Plus } from 'lucide-react';

// Base item interface
interface BaseItem {
  id: string;
  title: string;
  onClick: () => void;
}

// Specific item types
interface FlashcardSetItem extends BaseItem {
  cardCount: number;
  creatorType: 'user' | 'flyright';
}

interface ResourceItem extends BaseItem {
  type: string;
}

// Union type for all possible sidebar items
type SidebarItem = BaseItem | FlashcardSetItem | ResourceItem;

// Props for the Sidebar component
interface SidebarProps {
  title: string;
  sections: {
    title: string;
    items: SidebarItem[];
  }[];
  onAddItem?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ title, sections, onAddItem }) => {
  const renderItem = (item: SidebarItem) => {
    if ('cardCount' in item) {
      return (
        <Button key={item.id} variant="ghost" className="justify-start" onClick={item.onClick}>
          {item.title} ({item.cardCount} cards)
          {item.creatorType === 'flyright' && (
            <span className="ml-2 text-xs text-blue-500">FlyRight</span>
          )}
        </Button>
      );
    } else if ('type' in item) {
      return (
        <Button key={item.id} variant="ghost" className="justify-start" onClick={item.onClick}>
          {item.title} - {item.type}
        </Button>
      );
    } else {
      // This case handles BaseItem
      return (
        <Button key={item.id} variant="ghost" className="justify-start" onClick={item.onClick}>
          {item.title}
        </Button>
      );
    }
  };

  return (
    <aside className="w-64 bg-white p-4 hidden md:block">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {onAddItem && (
          <Button variant="ghost" size="icon" onClick={onAddItem} aria-label="Add new item">
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

export default Sidebar;
