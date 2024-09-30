import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MockOralPage from '../MockOralPage';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

describe('MockOral Integration', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: [] });
    render(<MockOralPage />);
  });

  it('starts a new session and displays it', async () => {
    const newSessionData = {
      id: 1,
      examiner_name: 'John Doe',
      stage: 'Private Pilot',
      topic: 'Navigation',
      created_at: new Date().toISOString(),
    };
    (api.post as jest.Mock).mockResolvedValue({ data: newSessionData });

    fireEvent.click(screen.getByText('New Mock Oral'));
    await waitFor(() => {
      expect(screen.getByText('John Doe -')).toBeInTheDocument();
    });
  });

  it('loads an existing session', async () => {
    const sessionData = {
      id: 1,
      examiner_name: 'Jane Smith',
      stage: 'Instrument',
      topic: 'Weather',
      created_at: new Date().toISOString(),
      topics: [{ id: 1, name: 'Weather Information', status: 'completed' }],
    };
    (api.get as jest.Mock).mockResolvedValue({ data: [sessionData] });

    // Trigger a re-render to fetch sessions
    fireEvent.click(screen.getByText('Mock Orals'));

    await waitFor(() => {
      expect(screen.getByText('Jane Smith -')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Jane Smith -'));

    await waitFor(() => {
      expect(screen.getByText('Weather Information')).toBeInTheDocument();
    });
  });

  it('sends a question and receives an answer', async () => {
    const questionResponse = {
      answer: 'This is the answer to your question.',
      topic: 'Weather Information',
      difficulty: 'Medium',
    };
    (api.post as jest.Mock).mockResolvedValue({ data: questionResponse });

    const input = screen.getByPlaceholderText('Type your answer here...');
    fireEvent.change(input, { target: { value: 'What is VFR?' } });
    fireEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(screen.getByText('This is the answer to your question.')).toBeInTheDocument();
      expect(screen.getByText('Topic: Weather Information')).toBeInTheDocument();
      expect(screen.getByText('Difficulty: Medium')).toBeInTheDocument();
    });
  });

  it('saves the current session', async () => {
    (api.put as jest.Mock).mockResolvedValue({ data: { message: 'Session saved successfully' } });

    // Start a new session first
    const newSessionData = {
      id: 1,
      examiner_name: 'John Doe',
      stage: 'Private Pilot',
      topic: 'Navigation',
      created_at: new Date().toISOString(),
    };
    (api.post as jest.Mock).mockResolvedValue({ data: newSessionData });
    fireEvent.click(screen.getByText('New Mock Oral'));

    await waitFor(() => {
      expect(screen.getByText('Save Session')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Save Session'));

    await waitFor(() => {
      expect(api.put).toHaveBeenCalled();
    });
  });
});