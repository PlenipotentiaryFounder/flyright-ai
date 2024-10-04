import React from 'react';
import { Flashcard } from '../flashcardTypes';
import Card from '../../Common/Components/Card';
import Button from '../../Common/Components/Button';

interface FlashcardDisplayProps {
  flashcard: Flashcard;
  showAnswer: boolean;
  onToggleAnswer: () => void;
  onMarkAsKnown: () => void;
  onMarkAsUnknown: () => void;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({
  flashcard,
  showAnswer,
  onToggleAnswer,
  onMarkAsKnown,
  onMarkAsUnknown
}) => {
  return (
    <Card className="mb-4 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Question:</h3>
        <p>{flashcard.question}</p>
      </div>
      {showAnswer && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Answer:</h3>
          <p>{flashcard.answer}</p>
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            Difficulty: {['Easy', 'Moderate', 'Hard'][flashcard.difficulty - 1]}
          </p>
          <p className="text-sm text-gray-600">
            Category: {flashcard.category?.name || 'Uncategorized'}
          </p>
        </div>
        <div className="space-x-2">
          <Button onClick={onToggleAnswer}>
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </Button>
          <Button onClick={onMarkAsKnown} variant="success">
            I Know This
          </Button>
          <Button onClick={onMarkAsUnknown} variant="danger">
            I Don't Know
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FlashcardDisplay;