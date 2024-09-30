import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MockOralPage from '../MockOralPage';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

describe('MockOralPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<MockOralPage />);
    expect(screen.getByText('Mock Orals')).toBeInTheDocument();
  });

  it('fetches sessions on mount', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    render(<MockOralPage />);
    await waitFor(() => expect(api.get).toHaveBeenCalledWith('/mockoral/sessions/'));
  });

  it('displays error message when fetching sessions fails', async () => {
    (api.get as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    render(<MockOralPage />);
    await waitFor(() => expect(screen.getByText('Failed to load mock oral sessions. Please try again.')).toBeInTheDocument());
  });

  it('starts a new session when "New Mock Oral" button is clicked', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { id: 1, examiner_name: 'John Doe' } });
    render(<MockOralPage />);
    fireEvent.click(screen.getByText('New Mock Oral'));
    await waitFor(() => expect(api.post).toHaveBeenCalledWith('/mockoral/sessions/', expect.any(Object)));
  });

  it('saves the current session when "Save Session" button is clicked', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: [] });
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { id: 1, examiner_name: 'John Doe' } });
    (api.put as jest.Mock).mockResolvedValueOnce({});
    render(<MockOralPage />);
    fireEvent.click(screen.getByText('New Mock Oral'));
    await waitFor(() => expect(screen.getByText('Save Session')).toBeInTheDocument());
    fireEvent.click(screen.getByText('Save Session'));
    await waitFor(() => expect(api.put).toHaveBeenCalledWith('/mockoral/sessions/1/', expect.any(Object)));
  });
});