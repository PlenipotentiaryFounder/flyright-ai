

import React from 'react';
import Button from "./Button";
import Sheet from './Sheet';
import SheetContent from './SheetContent';
import SheetTrigger from './SheetTrigger';

interface BaseItem {
  id: string;
  title: string;
  onClick: () => void;
}

interface ConversationItem extends BaseItem {}

interface ResourceItem extends BaseItem {
  type: string;
}

type SideMenuItem = ConversationItem | ResourceItem;

interface SideMenuProps {
  title: string;
  items: SideMenuItem[];
  triggerButton: React.ReactNode;
}

const SideMenu: React.FC<SideMenuProps> = ({ title, items, triggerButton }) => {
  const renderItem = (item: SideMenuItem) => {
    switch (true) {
      case 'type' in item:
        return (
          <Button key={item.id} variant="ghost" className="justify-start" onClick={item.onClick}>
            {item.title} - {(item as ResourceItem).type}
          </Button>
        );
      default:
        return (
          <Button key={item.id} variant="ghost" className="justify-start" onClick={item.onClick}>
            {item.title}
          </Button>
        );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {triggerButton}
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <nav className="flex flex-col space-y-4">
          {items.map(renderItem)}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
