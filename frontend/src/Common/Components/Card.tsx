import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;  // Add this line
}

const Card: React.FC<CardProps> = ({ className, children, onClick }) => {
  return (
    <div 
      className={`p-4 bg-white shadow-md rounded ${className}`}
      onClick={onClick}  // Add this line
    >
      {children}
    </div>
  );
};

export default Card;
