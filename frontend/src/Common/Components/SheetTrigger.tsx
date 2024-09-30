import React, { ReactNode } from 'react';
import { useSheetContext } from './Sheet';

interface SheetTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

const SheetTrigger: React.FC<SheetTriggerProps> = ({ children, asChild }) => {
  const { toggleSheet } = useSheetContext();

  // Ensure children is a valid React element
  if (!React.isValidElement(children)) {
    console.error('SheetTrigger requires a valid React element as a child');
    return null;
  }

  return React.cloneElement(children as React.ReactElement<any>, { onClick: toggleSheet });
};

export default SheetTrigger;
