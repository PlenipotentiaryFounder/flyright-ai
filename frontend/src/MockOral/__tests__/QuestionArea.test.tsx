import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import QuestionArea from '../QuestionArea';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

describe('QuestionArea', () => {
  const mockUpdateTopicStatus = jest.fn();
  const mockCurrentSession = {
    id: 1,
    examiner_name: 'John Doe',
    topics: [{ id: 1, name: 'Test Topic', status: 'unanswered' }],
  };

  beforeEach(() => {
    render(
      <QuestionArea
        currentSession={mockCurrentSession}
        updateTopicStatus={mockUpdateTopicStatus}
      />
    );
  });

  it('renders the input area', () => {
    expect(screen.getByPlaceholderText('Type your answer here...')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('handles user input and sends message', async () => {
    const input = screen.getByPlaceholderText('Type your answer here...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test question' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/api/mockoral/weaviate', { query: 'Test question' });
    });
  });

  it('displays error message on API failure', async () => {
    (api.post as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const input = screen.getByPlaceholderText('Type your answer here...');
    const sendButton = screen.getByText('Send');

    fireEvent.change(input, { target: { value: 'Test question' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText('Failed to get a response. Please try again.')).toBeInTheDocument();
    });
  });
});