import React, { useState, createContext, useContext, ReactNode } from 'react';

// Set up context for global state management
const SheetContext = createContext<{ isOpen: boolean; toggleSheet: () => void } | null>(null);

export const useSheetContext = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheetContext must be used within a Sheet component');
  }
  return context;
};

interface SheetProps {
  children: ReactNode;
  initialOpen?: boolean;
}

const Sheet: React.FC<SheetProps> = ({ children, initialOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SheetContext.Provider value={{ isOpen, toggleSheet }}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<any>, { isOpen, toggleSheet })
          : child
      )}
    </SheetContext.Provider>
  );
};

export default Sheet;
