import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlashcardManagement from '../../../Flashcards/Management/FlashcardManagement';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('FlashcardManagement', () => {
  const mockDecks = [
    { id: 1, name: 'Deck 1', description: 'Description 1', flashcard_count: 2 },
    { id: 2, name: 'Deck 2', description: 'Description 2', flashcard_count: 3 },
  ];

  const mockFlashcards = [
    { id: 1, deck: 1, question: 'Question 1', answer: 'Answer 1' },
    { id: 2, deck: 1, question: 'Question 2', answer: 'Answer 2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchFlashcardDecks as jest.Mock).mockResolvedValue({ results: mockDecks, next: null });
    (api.fetchFlashcards as jest.Mock).mockResolvedValue({ results: mockFlashcards, next: null });
  });

  it('renders without crashing', () => {
    render(<FlashcardManagement />);
    expect(screen.getByText('Flashcard Management')).toBeInTheDocument();
  });

  it('fetches and displays flashcard decks', async () => {
    render(<FlashcardManagement />);

    await waitFor(() => {
      expect(screen.getByText('Deck 1')).toBeInTheDocument();
      expect(screen.getByText('Deck 2')).toBeInTheDocument();
    });
  });

  it('creates a new flashcard deck', async () => {
    const newDeck = { id: 3, name: 'New Deck', description: 'New Description', flashcard_count: 0 };
    (api.createFlashcardDeck as jest.Mock).mockResolvedValue(newDeck);

    render(<FlashcardManagement />);

    fireEvent.change(screen.getByPlaceholderText('Deck Name'), { target: { value: 'New Deck' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'New Description' } });
    fireEvent.click(screen.getByText('Create Deck'));

    await waitFor(() => {
      expect(api.createFlashcardDeck).toHaveBeenCalledWith({
        name: 'New Deck',
        description: 'New Description'
      });
      expect(screen.getByText('New Deck')).toBeInTheDocument();
    });
  });

  it('deletes a flashcard deck', async () => {
    (api.deleteFlashcardDeck as jest.Mock).mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<FlashcardManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete Deck')[0]);
    });

    await waitFor(() => {
      expect(api.deleteFlashcardDeck).toHaveBeenCalledWith(1);
      expect(screen.queryByText('Deck 1')).not.toBeInTheDocument();
    });
  });

  it('searches flashcard decks', async () => {
    const searchedDecks = [mockDecks[0]];
    (api.fetchFlashcardDecks as jest.Mock).mockResolvedValue({ results: searchedDecks, next: null });

    render(<FlashcardManagement />);

    fireEvent.change(screen.getByPlaceholderText('Search flashcard decks...'), { target: { value: 'Deck 1' } });

    await waitFor(() => {
      expect(api.fetchFlashcardDecks).toHaveBeenCalledWith(1, 'Deck 1', expect.anything());
      expect(screen.getByText('Deck 1')).toBeInTheDocument();
      expect(screen.queryByText('Deck 2')).not.toBeInTheDocument();
    });
  });

  it('displays flashcards when a deck is selected', async () => {
    render(<FlashcardManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View Flashcards')[0]);
    });

    await waitFor(() => {
      expect(api.fetchFlashcards).toHaveBeenCalledWith(1);
      expect(screen.getByText('Question 1')).toBeInTheDocument();
      expect(screen.getByText('Answer 1')).toBeInTheDocument();
    });
  });

  it('creates a new flashcard', async () => {
    const newFlashcard = { id: 3, deck: 1, question: 'New Question', answer: 'New Answer' };
    (api.createFlashcard as jest.Mock).mockResolvedValue(newFlashcard);

    render(<FlashcardManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View Flashcards')[0]);
    });

    fireEvent.change(screen.getByPlaceholderText('Question'), { target: { value: 'New Question' } });
    fireEvent.change(screen.getByPlaceholderText('Answer'), { target: { value: 'New Answer' } });
    fireEvent.click(screen.getByText('Create Flashcard'));

    await waitFor(() => {
      expect(api.createFlashcard).toHaveBeenCalledWith(1, {
        question: 'New Question',
        answer: 'New Answer'
      });
      expect(screen.getByText('New Question')).toBeInTheDocument();
      expect(screen.getByText('New Answer')).toBeInTheDocument();
    });
  });

  it('deletes a flashcard', async () => {
    (api.deleteFlashcard as jest.Mock).mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<FlashcardManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('View Flashcards')[0]);
    });

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0]);
    });

    await waitFor(() => {
      expect(api.deleteFlashcard).toHaveBeenCalledWith(1, 1);
      expect(screen.queryByText('Question 1')).not.toBeInTheDocument();
    });
  });
});