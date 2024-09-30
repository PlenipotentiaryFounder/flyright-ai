import React from 'react';
import classNames from 'classnames'; // Ensure classnames package is installed
import { useSheetContext } from './Sheet';

interface SheetContentProps {
  side: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

const SheetContent: React.FC<SheetContentProps> = ({ side = 'left', className, children }) => {
  const { isOpen, toggleSheet } = useSheetContext();

  return (
    <div
      className={classNames(
        'fixed top-0 h-full bg-white transition-transform',
        {
          'transform -translate-x-full': !isOpen && side === 'left',
          'transform translate-x-0': isOpen && side === 'left',
          'transform translate-x-full': !isOpen && side === 'right',
          'transform -translate-x-0': isOpen && side === 'right',
        },
        className
      )}
    >
      <button onClick={toggleSheet} className="close-button">
        Close
      </button>
      {children}
    </div>
  );
};

export default SheetContent;
