import React, { useState, useEffect } from 'react';
import { fetchFlashcardDecks, createFlashcardDeck, updateFlashcardDeck, deleteFlashcardDeck, fetchFlashcards, createFlashcard, updateFlashcard, deleteFlashcard, FlashcardDeck, Flashcard } from '../../Admin/services/api';
import * as yup from 'yup';

const flashcardDeckSchema = yup.object().shape({
  name: yup.string().required('Deck name is required'),
  description: yup.string().required('Description is required'),
});

const flashcardSchema = yup.object().shape({
  question: yup.string().required('Question is required'),
  answer: yup.string().required('Answer is required'),
});

const FlashcardManagement: React.FC = () => {
  const [flashcardDecks, setFlashcardDecks] = useState<FlashcardDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<FlashcardDeck | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newDeck, setNewDeck] = useState<Partial<FlashcardDeck>>({ name: '', description: '' });
  const [newFlashcard, setNewFlashcard] = useState<Partial<Flashcard>>({ question: '', answer: '' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ min_cards: '', max_cards: '' });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    loadFlashcardDecks();
  }, [page, search, filters]);

  const loadFlashcardDecks = async () => {
    try {
      setLoading(true);
      const response = await fetchFlashcardDecks(page, search, {
        min_cards: filters.min_cards ? parseInt(filters.min_cards) : undefined,
        max_cards: filters.max_cards ? parseInt(filters.max_cards) : undefined,
      });
      if (page === 1) {
        setFlashcardDecks(response.results);
      } else {
        setFlashcardDecks(prevDecks => [...prevDecks, ...response.results]);
      }
      setHasMore(!!response.next);
      setError(null);
    } catch (err) {
      setError('Failed to load flashcard decks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleFilterChange = (key: 'min_cards' | 'max_cards', value: string) => {
    setFilters(prevFilters => ({ ...prevFilters, [key]: value }));
    setPage(1);
  };

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await flashcardDeckSchema.validate(newDeck, { abortEarly: false });
      const createdDeck = await createFlashcardDeck(newDeck);
      setFlashcardDecks([...flashcardDecks, createdDeck]);
      setNewDeck({ name: '', description: '' });
      setFormErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setError('Failed to create flashcard deck. Please try again.');
      }
    }
  };

  const handleUpdateDeck = async (deckId: number, deckData: Partial<FlashcardDeck>) => {
    try {
      const updatedDeck = await updateFlashcardDeck(deckId, deckData);
      setFlashcardDecks(flashcardDecks.map(deck => deck.id === updatedDeck.id ? updatedDeck : deck));
    } catch (err) {
      setError('Failed to update flashcard deck. Please try again.');
    }
  };

  const handleDeleteDeck = async (deckId: number) => {
    if (!window.confirm('Are you sure you want to delete this deck?')) return;
    try {
      await deleteFlashcardDeck(deckId);
      setFlashcardDecks(flashcardDecks.filter(deck => deck.id !== deckId));
      if (selectedDeck?.id === deckId) {
        setSelectedDeck(null);
        setFlashcards([]);
      }
    } catch (err) {
      setError('Failed to delete flashcard deck. Please try again.');
    }
  };

  const handleSelectDeck = async (deck: FlashcardDeck) => {
    setSelectedDeck(deck);
    try {
      const flashcardsData = await fetchFlashcards(deck.id);
      console.log(flashcardsData); // Inspect the structure in the console
      setFlashcards(flashcardsData.data || []); // Adjust based on the actual structure
    } catch (err) {
      setError('Failed to load flashcards. Please try again.');
    }
  };

  const handleCreateFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeck) return;
    try {
      await flashcardSchema.validate(newFlashcard, { abortEarly: false });
      const createdFlashcard = await createFlashcard(selectedDeck.id, newFlashcard);
      setFlashcards([...flashcards, createdFlashcard]);
      setNewFlashcard({ question: '', answer: '' });
      setFormErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setError('Failed to create flashcard. Please try again.');
      }
    }
  };

  const handleUpdateFlashcard = async (flashcardId: number, flashcardData: Partial<Flashcard>) => {
    if (!selectedDeck) return;
    try {
      const updatedFlashcard = await updateFlashcard(selectedDeck.id, flashcardId, flashcardData);
      setFlashcards(flashcards.map(card => card.id === updatedFlashcard.id ? updatedFlashcard : card));
    } catch (err) {
      setError('Failed to update flashcard. Please try again.');
    }
  };

  const handleDeleteFlashcard = async (flashcardId: number) => {
    if (!selectedDeck || !window.confirm('Are you sure you want to delete this flashcard?')) return;
    try {
      await deleteFlashcard(selectedDeck.id, flashcardId);
      setFlashcards(flashcards.filter(card => card.id !== flashcardId));
    } catch (err) {
      setError('Failed to delete flashcard. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Flashcard Management</h2>
      
      {/* Search and Filter */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search flashcard decks..."
          value={search}
          onChange={handleSearch}
          className="p-2 border rounded mr-2"
        />
        <input
          type="number"
          placeholder="Min cards"
          value={filters.min_cards}
          onChange={(e) => handleFilterChange('min_cards', e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="number"
          placeholder="Max cards"
          value={filters.max_cards}
          onChange={(e) => handleFilterChange('max_cards', e.target.value)}
          className="p-2 border rounded mr-2"
        />
      </div>

      {/* Create Deck Form */}
      <form onSubmit={handleCreateDeck} className="mb-8">
        <input
          type="text"
          placeholder="Deck Name"
          value={newDeck.name}
          onChange={(e) => setNewDeck({...newDeck, name: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.name ? 'border-red-500' : ''}`}
        />
        {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        <input
          type="text"
          placeholder="Description"
          value={newDeck.description}
          onChange={(e) => setNewDeck({...newDeck, description: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.description ? 'border-red-500' : ''}`}
        />
        {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Deck</button>
      </form>

      {/* Deck List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcardDecks.map((deck) => (
          <div key={deck.id} className="border p-4 rounded">
            <h3 className="font-bold">{deck.name}</h3>
            <p>{deck.description}</p>
            <p>Flashcards: {deck.flashcard_count}</p>
            <button onClick={() => handleSelectDeck(deck)} className="bg-green-500 text-white px-2 py-1 rounded mr-2 mt-2">View Flashcards</button>
            <button onClick={() => handleDeleteDeck(deck.id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete Deck</button>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}

      {/* Selected Deck and Flashcards */}
      {selectedDeck && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Flashcards for {selectedDeck.name}</h3>
          
          {/* Create Flashcard Form */}
          <form onSubmit={handleCreateFlashcard} className="mb-4">
            <input
              type="text"
              placeholder="Question"
              value={newFlashcard.question}
              onChange={(e) => setNewFlashcard({...newFlashcard, question: e.target.value})}
              className="mr-2 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Answer"
              value={newFlashcard.answer}
              onChange={(e) => setNewFlashcard({...newFlashcard, answer: e.target.value})}
              className="mr-2 p-2 border rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Flashcard</button>
          </form>

          {/* Flashcard List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashcards.map((card) => (
              <div key={card.id} className="border p-4 rounded">
                <p><strong>Q:</strong> {card.question}</p>
                <p><strong>A:</strong> {card.answer}</p>
                <button onClick={() => handleDeleteFlashcard(card.id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardManagement;