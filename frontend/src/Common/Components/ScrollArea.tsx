import React from 'react';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string; // Add className prop
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children, className }) => {
  return (
    <div className={className} style={{ overflowY: 'auto', maxHeight: '100vh' }}>
      {children}
    </div>
  );
};

export default ScrollArea;
