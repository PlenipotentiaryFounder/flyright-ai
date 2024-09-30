import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={`p-4 bg-white shadow-md rounded ${className}`}>
      {children}
    </div>
  );
};

export default Card;
