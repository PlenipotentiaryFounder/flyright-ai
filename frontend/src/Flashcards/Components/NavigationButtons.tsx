import React from 'react';
import Button from '../../Common/Components/Button';

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ onPrevious, onNext, currentIndex, total }) => {
  return (
    <div className="flex justify-between items-center">
      <Button onClick={onPrevious} variant="outline">Previous</Button>
      <span className="text-sm text-gray-500">
        Card {currentIndex} of {total}
      </span>
      <Button onClick={onNext} variant="outline">Next</Button>
    </div>
  );
};

export default NavigationButtons;