import React from 'react';
import Button from './Button'; // Adjusted the import path
import { Trash2 } from 'lucide-react';

interface FooterProps {
  clearChat?: () => void; // Make clearChat optional
}

const Footer: React.FC<FooterProps> = ({ clearChat }) => {
  return (
    <footer className="bg-white border-t border-gray-200 p-4 flex justify-between items-center">
      <p className="text-xs text-gray-500">FlyRight AI makes mistakes. Use discretion when reviewing information.</p>
      <Button variant="ghost" size="small" onClick={clearChat} className="text-gray-500">
        <Trash2 className="h-4 w-4 mr-2" />
        Clear Chat
      </Button>
    </footer>
  );
};

export default Footer;
