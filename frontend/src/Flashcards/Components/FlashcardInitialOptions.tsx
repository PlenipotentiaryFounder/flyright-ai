import React from 'react';
import Button from '../../Common/Components/Button';
import Card from '../../Common/Components/Card';

interface FlashcardInitialOptionsProps {
  onCreateWithAI: () => void;
  onReviewChallenging: () => void;
  onCreateFromMockOral: () => void;
}

const FlashcardInitialOptions: React.FC<FlashcardInitialOptionsProps> = ({
  onCreateWithAI,
  onReviewChallenging,
  onCreateFromMockOral
}) => {
  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Flashcards</h2>
      <div className="space-y-4">
        <Button
          onClick={onCreateWithAI}
          variant="ghost"
          fullWidth
          className="py-3 text-lg"
        >
          Create new set with FlyRight AI Prompt
        </Button>
        <Button
          onClick={onReviewChallenging}
          variant="ghost"
          fullWidth
          className="py-3 text-lg"
        >
          Review your most challenging flashcards
        </Button>
        <Button
          onClick={onCreateFromMockOral}
          variant="ghost"
          fullWidth
          className="py-3 text-lg"
        >
          Create based on a recent Mock Oral Session
        </Button>
      </div>
    </Card>
  );
};

export default FlashcardInitialOptions;
