import React, { useState } from 'react';
import { PlaneTakeoff, Settings, Menu } from 'lucide-react';
import Button from './Button';
import Sheet from './Sheet'; // Updated path
import SheetContent from './SheetContent';
import SheetTrigger from './SheetTrigger'; // Update the path if necessary

const toggleSheet = () => {
  // Your toggle logic here
};

interface HeaderProps {
  navItems: string[];
  placeholderConversations: string[];

}

const Header: React.FC<HeaderProps> = ({ navItems, placeholderConversations }) => {
  const [open, setOpen] = useState(false); // Ensure 'open' is a boolean

  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <h2 className="text-lg font-semibold mb-4">Your Conversations</h2>
              {placeholderConversations.map((convo, index) => (
                <Button key={index} variant="ghost" className="justify-start">
                  {convo}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex items-center space-x-2">
          <PlaneTakeoff className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-semibold text-sky-700">FlyRight AI</span>
        </div>
      </div>
      <nav className="hidden md:flex space-x-4">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={item === "Chat" ? "text-sky-600" : ""}
          >
            {item}
          </Button>
        ))}
      </nav>
      <Button variant="ghost" size="icon" aria-label="Settings">
        <Settings className="h-5 w-5" />
      </Button>
    </header>
  );
};

export default Header;
