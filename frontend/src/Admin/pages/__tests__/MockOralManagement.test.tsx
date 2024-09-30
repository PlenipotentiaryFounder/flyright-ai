import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MockOralManagement from '../../../MockOral/Management/MockOralManagement';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('MockOralManagement', () => {
  const mockMockOrals = [
    { id: 1, examiner_name: 'Examiner1', created_at: '2023-01-01', score: 85, status: 'approved' },
    { id: 2, examiner_name: 'Examiner2', created_at: '2023-01-02', score: null, status: 'pending' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchMockOrals as jest.Mock).mockResolvedValue({ results: mockMockOrals, next: null });
  });

  it('renders without crashing', () => {
    render(<MockOralManagement />);
    expect(screen.getByText('Mock Oral Management')).toBeInTheDocument();
  });

  it('fetches and displays mock orals', async () => {
    render(<MockOralManagement />);

    await waitFor(() => {
      expect(screen.getByText('Examiner1')).toBeInTheDocument();
      expect(screen.getByText('Examiner2')).toBeInTheDocument();
    });
  });

  it('creates a new mock oral', async () => {
    const newMockOral = { id: 3, examiner_name: 'NewExaminer', created_at: '2023-01-03', score: 90, status: 'pending' };
    (api.createMockOral as jest.Mock).mockResolvedValue(newMockOral);

    render(<MockOralManagement />);

    fireEvent.change(screen.getByPlaceholderText('Examiner Name'), { target: { value: 'NewExaminer' } });
    fireEvent.change(screen.getByPlaceholderText('Score'), { target: { value: '90' } });
    fireEvent.click(screen.getByText('Create Mock Oral'));

    await waitFor(() => {
      expect(api.createMockOral).toHaveBeenCalledWith({
        examiner_name: 'NewExaminer',
        score: 90,
        status: 'pending'
      });
      expect(screen.getByText('NewExaminer')).toBeInTheDocument();
    });
  });

  it('approves a mock oral', async () => {
    (api.approveMockOral as jest.Mock).mockResolvedValue({});

    render(<MockOralManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Approve')[1]);
    });

    await waitFor(() => {
      expect(api.approveMockOral).toHaveBeenCalledWith(2);
      expect(screen.getAllByText('approved')[1]).toBeInTheDocument();
    });
  });

  it('rejects a mock oral', async () => {
    (api.rejectMockOral as jest.Mock).mockResolvedValue({});

    render(<MockOralManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Reject')[1]);
    });

    await waitFor(() => {
      expect(api.rejectMockOral).toHaveBeenCalledWith(2);
      expect(screen.getAllByText('rejected')[0]).toBeInTheDocument();
    });
  });

  it('deletes a mock oral', async () => {
    (api.deleteMockOral as jest.Mock).mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<MockOralManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0]);
    });

    await waitFor(() => {
      expect(api.deleteMockOral).toHaveBeenCalledWith(1);
      expect(screen.queryByText('Examiner1')).not.toBeInTheDocument();
    });
  });

  it('searches mock orals', async () => {
    const searchedMockOrals = [mockMockOrals[0]];
    (api.fetchMockOrals as jest.Mock).mockResolvedValue({ results: searchedMockOrals, next: null });

    render(<MockOralManagement />);

    fireEvent.change(screen.getByPlaceholderText('Search mock orals...'), { target: { value: 'Examiner1' } });

    await waitFor(() => {
      expect(api.fetchMockOrals).toHaveBeenCalledWith(1, 'Examiner1', expect.anything());
      expect(screen.getByText('Examiner1')).toBeInTheDocument();
      expect(screen.queryByText('Examiner2')).not.toBeInTheDocument();
    });
  });

  it('filters mock orals by status', async () => {
    const filteredMockOrals = [mockMockOrals[1]];
    (api.fetchMockOrals as jest.Mock).mockResolvedValue({ results: filteredMockOrals, next: null });

    render(<MockOralManagement />);

    fireEvent.change(screen.getByText('All Status'), { target: { value: 'pending' } });

    await waitFor(() => {
      expect(api.fetchMockOrals).toHaveBeenCalledWith(1, '', { status: 'pending' });
      expect(screen.queryByText('Examiner1')).not.toBeInTheDocument();
      expect(screen.getByText('Examiner2')).toBeInTheDocument();
    });
  });
});