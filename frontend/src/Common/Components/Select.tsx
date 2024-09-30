import React, { useState, useRef, useEffect, ReactNode } from 'react';

interface SelectProps {
  onValueChange: (value: string) => void;
  children: ReactNode;
}

interface SelectTriggerProps {
  children: ReactNode;
}

interface SelectContentProps {
  children: ReactNode;
}

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

interface SelectValueProps {
  placeholder: string;
}

const SelectContext = React.createContext<any>(null);

export const Select: React.FC<SelectProps> = ({ onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const toggleOpen = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onValueChange(value);
    close();
  };

  return (
    <SelectContext.Provider value={{ isOpen, selectedValue, toggleOpen, handleSelect }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ children }) => {
  const { toggleOpen } = React.useContext(SelectContext);
  return (
    <button onClick={toggleOpen} className="w-full text-left">
      {children}
    </button>
  );
};

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  const { isOpen } = React.useContext(SelectContext);
  return isOpen ? (
    <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
      {children}
    </div>
  ) : null;
};

export const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  const { handleSelect } = React.useContext(SelectContext);
  return (
    <div
      onClick={() => handleSelect(value)}
      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
    >
      {children}
    </div>
  );
};

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { selectedValue } = React.useContext(SelectContext);
  return (
    <span className="block truncate">
      {selectedValue || <span className="text-gray-500">{placeholder}</span>}
    </span>
  );
};