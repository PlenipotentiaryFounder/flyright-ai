import React from 'react';
import { Flashcard } from '../flashcardTypes';
import Card from '../../Common/Components/Card';
import Button from '../../Common/Components/Button';

interface FlashcardDisplayProps {
  flashcard: Flashcard;
  showAnswer: boolean;
  showBoldText: boolean;
  onToggleAnswer: () => void;
  onToggleBoldText: () => void;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({
  flashcard,
  showAnswer,
  showBoldText,
  onToggleAnswer,
  onToggleBoldText
}) => {
  return (
    <Card className="mb-4 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Question:</h3>
        <p>{showBoldText && flashcard.bold_question ? flashcard.bold_question : flashcard.question}</p>
      </div>
      {showAnswer && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Answer:</h3>
          <p>{showBoldText && flashcard.bold_answer ? flashcard.bold_answer : flashcard.answer}</p>
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
          <Button onClick={onToggleBoldText} className="font-bold text-blue-500">
            B
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FlashcardDisplay;