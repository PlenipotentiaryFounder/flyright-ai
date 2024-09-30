import React from 'react';
import Button, { PrimaryButton } from './Common/Components/Button';  

interface PagesMenuBarProps {

  navItems: string[];
  currentPage: string;
}

const PagesMenuBar: React.FC<PagesMenuBarProps> = ({ navItems, currentPage }) => {
  return (
    <nav className="flex space-x-4">
      {navItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          className={item === currentPage ? "text-sky-600" : ""}
        >
          {item}
        </Button>
      ))}
    </nav>
  );
};

export default PagesMenuBar;