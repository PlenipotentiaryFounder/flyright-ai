import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Button from "../../Common/Components/Button";
import Card from "../../Common/Components/Card";
import Spinner from '../../Common/Components/Spinner';
import FlashcardDisplay from '../Components/FlashcardDisplay';
import NavigationButtons from '../Components/NavigationButtons';
import { Flashcard } from '../flashcardTypes';

const FlashcardsPage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/api/flashcards/');
      setFlashcards(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setError('Failed to load flashcards. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setShowAnswer(false);
  };

  const handlePreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    setShowAnswer(false);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-500">
        <p>{error}</p>
        <Button onClick={fetchFlashcards} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return <div className="text-center mt-8">No flashcards available.</div>;
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flashcards</h1>
      <Card className="mb-4">
        <FlashcardDisplay
          card={currentCard}
          showAnswer={showAnswer}
          onToggleAnswer={toggleAnswer}
        />
      </Card>
      <NavigationButtons
        onPrevious={handlePreviousCard}
        onNext={handleNextCard}
        currentIndex={currentCardIndex + 1}
        total={flashcards.length}
      />
    </div>
  );
};

export default FlashcardsPage;