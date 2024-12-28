import React, { useState, useEffect } from 'react';
import { fetchFlashcardCategories, fetchFlashcardSets, fetchFlashcards, createFlashcardSet, createFlashcard } from '../../utils/api';
import Spinner from '../../Common/Components/Spinner';
import FlashcardDisplay from '../Components/FlashcardDisplay';
import NavigationButtons from '../Components/NavigationButtons';
import FlashcardInitialOptions from '../Components/FlashcardInitialOptions';
import { Flashcard, FlashcardSet, FlashcardCategory } from '../flashcardTypes';
import FlashcardSidebar from '../Components/flashcardSidebar';
import Header from '../../Common/Components/Header';
import Footer from '../../Common/Components/Footer';

const placeholderConversations = [
  "Weather Patterns Discussion",
  "Navigation Techniques",
  "Aircraft Systems Overview",
  "Flight Planning Strategies",
  "Emergency Procedures Review"
];

const FlashcardsPage: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [flashcardCounts, setFlashcardCounts] = useState<{ [setId: number]: number }>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInitialOptions, setShowInitialOptions] = useState(true);
  const [showBoldText, setShowBoldText] = useState(false);
  const [categories, setCategories] = useState<FlashcardCategory[]>([]);

  useEffect(() => {
    fetchCategoriesAndSets();
  }, []);

  const fetchCategoriesAndSets = async () => {
    try {
      setIsLoading(true);
      const [categoriesData, setsData] = await Promise.all([
        fetchFlashcardCategories(),
        fetchFlashcardSets()
      ]);
      setCategories(categoriesData);
      setFlashcardSets(setsData);
      console.log('Fetched categories:', categoriesData);
      console.log('Fetched flashcard sets:', setsData);
      fetchFlashcardCounts(setsData);
    } catch (error) {
      console.error('Error fetching categories and sets:', error);
      setError('Failed to load flashcard categories and sets. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFlashcardCounts = async (sets: FlashcardSet[]) => {
    const counts: { [setId: number]: number } = {};
    for (const set of sets) {
      try {
        const flashcardsData = await fetchFlashcards(set.id);
        counts[set.id] = flashcardsData.results.length;
      } catch (error) {
        console.error(`Error fetching flashcards for set ${set.id}:`, error);
        counts[set.id] = 0;
      }
    }
    setFlashcardCounts(counts);
  };

  const handleFlashcardSetClick = async (setId: number) => {
    try {
      setIsLoading(true);
      const flashcardsData = await fetchFlashcards(setId);
      setFlashcards(flashcardsData.results);
      setCurrentCardIndex(0);
      setShowAnswer(false);
      setError(null);
      setShowInitialOptions(false);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setError('Failed to load flashcards. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBoldText = () => {
    setShowBoldText(!showBoldText);
  };

  const handleAddSet = async () => {
    // Implement logic to add a new flashcard set
    try {
      const newSet: Partial<FlashcardSet> = {
        name: "New Flashcard Set",
        // Add other necessary fields
      };
      const createdSet = await createFlashcardSet(newSet);
      setFlashcardSets(prevSets => [...prevSets, createdSet]);
      console.log("Added new flashcard set:", createdSet);
    } catch (error) {
      console.error("Error adding new flashcard set:", error);
      setError('Failed to add new flashcard set. Please try again later.');
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
          showBoldText={showBoldText}
          onToggleAnswer={toggleAnswer}
          onToggleBoldText={toggleBoldText}
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

  const organizeFlashcardSets = (sets: FlashcardSet[], categories: FlashcardCategory[]) => {
    const organized = {
      flyright: {} as Record<number, FlashcardSet[]>,
      user: {} as Record<number, FlashcardSet[]>
    };

    categories.forEach(category => {
      if (category.creatorType === 'flyright') {
        organized.flyright[category.id] = [];
      } else {
        organized.user[category.id] = [];
      }
    });

    sets.forEach(set => {
      if (set.category) {
        if (set.creatorType === 'flyright') {
          organized.flyright[set.category.id].push(set);
        } else {
          organized.user[set.category.id].push(set);
        }
      }
    });

    return organized;
  };

  const organizedSets = organizeFlashcardSets(flashcardSets, categories);
  console.log('Organized sets:', organizedSets);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header placeholderConversations={placeholderConversations} />
      <div className="flex flex-grow">
        <FlashcardSidebar 
          categories={categories}
          organizedSets={organizedSets}
          onAddSet={handleAddSet}
          onSelectSet={handleFlashcardSetClick}
          flashcardCounts={flashcardCounts}
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