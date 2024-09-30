import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import FlashcardsPage from '../FlashcardsPage';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

const mockFlashcards = [
  { id: 1, question: 'Question 1', answer: 'Answer 1', category: 'Category 1' },
  { id: 2, question: 'Question 2', answer: 'Answer 2', category: 'Category 2' },
];

describe('FlashcardsPage', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockFlashcards });
  });

  it('renders loading state initially', () => {
    render(<FlashcardsPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders flashcards after loading', async () => {
    render(<FlashcardsPage />);
    await waitFor(() => {
      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });
  });

  it('navigates to next flashcard', async () => {
    render(<FlashcardsPage />);
    await waitFor(() => {
      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Question 2')).toBeInTheDocument();
  });

  it('shows answer when toggle button is clicked', async () => {
    render(<FlashcardsPage />);
    await waitFor(() => {
      expect(screen.getByText('Question 1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Show Answer'));
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
  });

  it('handles API error', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<FlashcardsPage />);
    await waitFor(() => {
      expect(screen.getByText(/failed to load flashcards/i)).toBeInTheDocument();
    });
  });
});