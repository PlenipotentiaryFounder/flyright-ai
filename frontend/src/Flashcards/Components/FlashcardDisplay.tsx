import React from 'react';
import Button from '../../Common/Components/Button';
import { Flashcard } from '../flashcardTypes';

interface FlashcardDisplayProps {
  card: Flashcard;
  showAnswer: boolean;
  onToggleAnswer: () => void;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({ card, showAnswer, onToggleAnswer }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{card.category}</h2>
      <p className="text-lg mb-4">{card.question}</p>
      {showAnswer && (
        <p className="text-lg text-green-600 mb-4">{card.answer}</p>
      )}
      <Button onClick={onToggleAnswer}>
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </Button>
    </div>
  );
};

export default FlashcardDisplay;