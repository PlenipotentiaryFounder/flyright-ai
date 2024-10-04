import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneTakeoff, Settings, Menu, User, LogOut, X } from 'lucide-react';
import Button from './Button';
import Sheet from './Sheet';
import SheetContent from './SheetContent';
import SheetTrigger from './SheetTrigger';
import PagesMenuBar from './PagesMenuBar';
import { MAIN_NAV_ITEMS } from '../../constants';

interface HeaderProps {
  placeholderConversations: string[];
}

const Header: React.FC<HeaderProps> = ({ placeholderConversations }) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Sheet>
          <SheetTrigger>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Conversations</h2>
              <SheetTrigger>
                <Button variant="ghost" size="icon" aria-label="Close menu">
                  <X className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
            <nav className="flex flex-col space-y-4">
              {placeholderConversations.map((convo, index) => (
                <Button key={index} variant="ghost" className="justify-start">
                  {convo}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link to="/" className="flex items-center space-x-2">
          <PlaneTakeoff className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-semibold text-sky-700">FlyRight AI</span>
        </Link>
      </div>
      <PagesMenuBar />
      <div className="flex items-center space-x-2">
        <Link to="/settings">
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" aria-label="Logout">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
