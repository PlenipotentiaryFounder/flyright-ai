import React, { useState, useEffect } from 'react';
import { fetchFlashcardSets, createFlashcardSet, updateFlashcardSet, deleteFlashcardSet, fetchFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../../utils/api';
import { FlashcardSet, Flashcard } from '../flashcardTypes';
import * as yup from 'yup';

const flashcardSetSchema = yup.object().shape({
  name: yup.string().required('Set name is required'),
  description: yup.string().required('Description is required'),
});

const flashcardSchema = yup.object().shape({
  question: yup.string().required('Question is required'),
  answer: yup.string().required('Answer is required'),
});

const FlashcardManagement: React.FC = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [selectedSet, setSelectedSet] = useState<FlashcardSet | null>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSet, setNewSet] = useState<Partial<FlashcardSet>>({ name: '', description: '' });
  const [newFlashcard, setNewFlashcard] = useState<Partial<Flashcard>>({ question: '', answer: '' });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ min_cards: '', max_cards: '' });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    loadFlashcardSets();
  }, [page, search, filters]);

  const loadFlashcardSets = async () => {
    try {
      setLoading(true);
      const response = await fetchFlashcardSets(page);
      if (page === 1) {
        setFlashcardSets(response.results);
      } else {
        setFlashcardSets([...flashcardSets, ...response.results]);
      }
      setHasMore(!!response.next);
    } catch (err) {
      setError('Failed to load flashcard sets. Please try again.');
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

  const handleCreateSet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await flashcardSetSchema.validate(newSet, { abortEarly: false });
      const createdSet = await createFlashcardSet(newSet);
      setFlashcardSets([...flashcardSets, createdSet]);
      setNewSet({ name: '', description: '' });
      setFormErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormErrors(errors);
      } else {
        setError('Failed to create flashcard set. Please try again.');
      }
    }
  };

  const handleUpdateSet = async (setId: number, setData: Partial<FlashcardSet>) => {
    try {
      const updatedSet = await updateFlashcardSet(setId, setData);
      setFlashcardSets(flashcardSets.map(set => set.id === updatedSet.id ? updatedSet : set));
    } catch (err) {
      setError('Failed to update flashcard set. Please try again.');
    }
  };

  const handleDeleteSet = async (setId: number) => {
    if (!window.confirm('Are you sure you want to delete this set?')) return;
    try {
      await deleteFlashcardSet(setId);
      setFlashcardSets(flashcardSets.filter(set => set.id !== setId));
      if (selectedSet?.id === setId) {
        setSelectedSet(null);
        setFlashcards([]);
      }
    } catch (err) {
      setError('Failed to delete flashcard set. Please try again.');
    }
  };

  const handleSelectSet = async (set: FlashcardSet) => {
    setSelectedSet(set);
    try {
      const flashcardsData = await fetchFlashcards(set.id);
      setFlashcards(flashcardsData.results || []);
    } catch (err) {
      setError('Failed to load flashcards. Please try again.');
    }
  };

  const handleCreateFlashcard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSet) return;
    try {
      await flashcardSchema.validate(newFlashcard, { abortEarly: false });
      const createdFlashcard = await createFlashcard(selectedSet.id, newFlashcard);
      setFlashcards([...flashcards, createdFlashcard]);
      setNewFlashcard({ question: '', answer: '' });
      setFormErrors({});
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors: {[key: string]: string} = {};
        err.inner.forEach((error) => {
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
    if (!selectedSet) return;
    try {
      const updatedFlashcard = await updateFlashcard(selectedSet.id, flashcardId, flashcardData);
      setFlashcards(flashcards.map(card => card.id === updatedFlashcard.id ? updatedFlashcard : card));
    } catch (err) {
      setError('Failed to update flashcard. Please try again.');
    }
  };

  const handleDeleteFlashcard = async (flashcardId: number) => {
    if (!selectedSet || !window.confirm('Are you sure you want to delete this flashcard?')) return;
    try {
      await deleteFlashcard(selectedSet.id, flashcardId);
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
          placeholder="Search flashcard sets..."
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

      {/* Create Set Form */}
      <form onSubmit={handleCreateSet} className="mb-8">
        <input
          type="text"
          placeholder="Set Name"
          value={newSet.name}
          onChange={(e) => setNewSet({...newSet, name: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.name ? 'border-red-500' : ''}`}
        />
        {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        <input
          type="text"
          placeholder="Description"
          value={newSet.description}
          onChange={(e) => setNewSet({...newSet, description: e.target.value})}
          className={`mr-2 p-2 border rounded ${formErrors.description ? 'border-red-500' : ''}`}
        />
        {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Set</button>
      </form>

      {/* Set List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {flashcardSets.map((set) => (
          <div key={set.id} className="border p-4 rounded">
            <h3 className="font-bold">{set.name}</h3>
            <p>{set.description}</p>
            <p>Flashcards: {set.flashcard_count}</p>
            <button onClick={() => handleSelectSet(set)} className="bg-green-500 text-white px-2 py-1 rounded mr-2 mt-2">View Flashcards</button>
            <button onClick={() => handleDeleteSet(set.id)} className="bg-red-500 text-white px-2 py-1 rounded mt-2">Delete Set</button>
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

      {/* Selected Set and Flashcards */}
      {selectedSet && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Flashcards for {selectedSet.name}</h3>
          
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