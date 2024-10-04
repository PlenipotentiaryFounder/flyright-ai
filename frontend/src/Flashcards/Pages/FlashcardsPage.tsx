import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import Spinner from '../../Common/Components/Spinner';
import FlashcardDisplay from '../Components/FlashcardDisplay';
import NavigationButtons from '../Components/NavigationButtons';
import FlashcardInitialOptions from '../Components/FlashcardInitialOptions';
import { Flashcard } from '../flashcardTypes';
import Sidebar from '../../Common/Components/Sidebar';
import Header from '../../Common/Components/Header';
import Footer from '../../Common/Components/Footer';

const placeholderConversations = [
  "Weather Patterns Discussion",
  "Navigation Techniques",
  "Aircraft Systems Overview",
  "Flight Planning Strategies",
  "Emergency Procedures Review"
];

interface FlashcardSetItem {
  id: string;
  title: string;
  cardCount: number;
  creatorType: 'user' | 'flyright';
  onClick: () => void;
}

const FlashcardsPage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSetItem[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInitialOptions, setShowInitialOptions] = useState(true);

  useEffect(() => {
    fetchFlashcardSets();
    fetchFlashcards();
  }, []);

  const fetchFlashcardSets = async () => {
    try {
      const response = await api.get('/api/flashcard-sets/');
      setFlashcardSets(response.data);
    } catch (error) {
      console.error('Error fetching flashcard sets:', error);
    }
  };

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

  const handleFlashcardSetClick = (setId: string) => {
    // Implement logic to load flashcards for the selected set
    console.log(`Loading flashcard set: ${setId}`);
  };

  const handleAddSet = () => {
    // Implement logic to add a new flashcard set
    console.log("Adding new flashcard set");
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

  const handleMarkAsKnown = () => {
    // Implement logic to mark the card as known
    console.log("Marked as known");
  };

  const handleMarkAsUnknown = () => {
    // Implement logic to mark the card as unknown
    console.log("Marked as unknown");
  };

  const flyRightSets = flashcardSets.filter(set => set.creatorType === 'flyright');
  const userSets = flashcardSets.filter(set => set.creatorType === 'user');

  const sidebarSections = [
    {
      title: "FlyRight Flashcard Sets",
      items: flyRightSets
    },
    {
      title: "My Flashcard Sets",
      items: userSets
    }
  ];

  const handleCreateWithAI = () => {
    // Implement logic to create a new set with AI
    console.log("Creating new set with AI");
    setShowInitialOptions(false);
  };

  const handleReviewChallenging = () => {
    // Implement logic to review challenging flashcards
    console.log("Reviewing challenging flashcards");
    setShowInitialOptions(false);
  };

  const handleCreateFromMockOral = () => {
    // Implement logic to create from mock oral session
    console.log("Creating from mock oral session");
    setShowInitialOptions(false);
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

    if (showInitialOptions) {
      return (
        <FlashcardInitialOptions
          onCreateWithAI={handleCreateWithAI}
          onReviewChallenging={handleReviewChallenging}
          onCreateFromMockOral={handleCreateFromMockOral}
        />
      );
    }

    if (flashcards.length === 0) {
      return <p>No flashcards available. Create some to get started!</p>;
    }

    return (
      <>
        <FlashcardDisplay
          flashcard={flashcards[currentCardIndex]}
          showAnswer={showAnswer}
          onToggleAnswer={toggleAnswer}
          onMarkAsKnown={handleMarkAsKnown}
          onMarkAsUnknown={handleMarkAsUnknown}
        />
        <NavigationButtons
          onPrevious={handlePreviousCard}
          onNext={handleNextCard}
          currentIndex={currentCardIndex + 1}
          total={flashcards.length}
        />
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header placeholderConversations={placeholderConversations} />
      <div className="flex flex-grow">
        <Sidebar 
          title="Flashcard Sets"
          sections={sidebarSections}
          onAddItem={handleAddSet}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          {renderContent()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default FlashcardsPage;