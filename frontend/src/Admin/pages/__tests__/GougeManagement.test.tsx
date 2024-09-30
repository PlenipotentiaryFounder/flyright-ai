import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GougeManagement from '../../../Gouge/Management/GougeManagement';
import * as api from '../../services/api';

jest.mock('../../services/api');

describe('GougeManagement', () => {
  const mockGouges = [
    { id: 1, examiner_name: 'Examiner1', date: '2023-01-01', outcome: 'pass', text: 'Gouge 1 text' },
    { id: 2, examiner_name: 'Examiner2', date: '2023-01-02', outcome: 'fail', text: 'Gouge 2 text' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchGouges as jest.Mock).mockResolvedValue({ results: mockGouges, next: null });
  });

  it('renders without crashing', () => {
    render(<GougeManagement />);
    expect(screen.getByText('Gouge Management')).toBeInTheDocument();
  });

  it('fetches and displays gouges', async () => {
    render(<GougeManagement />);

    await waitFor(() => {
      expect(screen.getByText('Examiner1')).toBeInTheDocument();
      expect(screen.getByText('Examiner2')).toBeInTheDocument();
    });
  });

  it('creates a new gouge', async () => {
    const newGouge = { id: 3, examiner_name: 'NewExaminer', date: '2023-01-03', outcome: 'pass', text: 'New gouge text' };
    (api.createGouge as jest.Mock).mockResolvedValue(newGouge);

    render(<GougeManagement />);

    fireEvent.change(screen.getByPlaceholderText('Examiner Name'), { target: { value: 'NewExaminer' } });
    fireEvent.change(screen.getByPlaceholderText('Gouge Text'), { target: { value: 'New gouge text' } });
    fireEvent.click(screen.getByText('Create Gouge'));

    await waitFor(() => {
      expect(api.createGouge).toHaveBeenCalledWith(expect.objectContaining({
        examiner_name: 'NewExaminer',
        text: 'New gouge text'
      }));
      expect(screen.getByText('NewExaminer')).toBeInTheDocument();
    });
  });

  it('updates a gouge', async () => {
    const updatedGouge = { ...mockGouges[0], examiner_name: 'UpdatedExaminer' };
    (api.updateGouge as jest.Mock).mockResolvedValue(updatedGouge);

    render(<GougeManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Edit')[0]);
    });

    fireEvent.change(screen.getByDisplayValue('Examiner1'), { target: { value: 'UpdatedExaminer' } });
    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(api.updateGouge).toHaveBeenCalledWith(1, expect.objectContaining({ examiner_name: 'UpdatedExaminer' }));
      expect(screen.getByText('UpdatedExaminer')).toBeInTheDocument();
    });
  });

  it('deletes a gouge', async () => {
    (api.deleteGouge as jest.Mock).mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<GougeManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0]);
    });

    await waitFor(() => {
      expect(api.deleteGouge).toHaveBeenCalledWith(1);
      expect(screen.queryByText('Examiner1')).not.toBeInTheDocument();
    });
  });

  it('searches gouges', async () => {
    const searchedGouges = [mockGouges[0]];
    (api.fetchGouges as jest.Mock).mockResolvedValue({ results: searchedGouges, next: null });

    render(<GougeManagement />);

    fireEvent.change(screen.getByPlaceholderText('Search gouges...'), { target: { value: 'Examiner1' } });

    await waitFor(() => {
      expect(api.fetchGouges).toHaveBeenCalledWith(1, 'Examiner1', expect.anything());
      expect(screen.getByText('Examiner1')).toBeInTheDocument();
      expect(screen.queryByText('Examiner2')).not.toBeInTheDocument();
    });
  });

  it('filters gouges by outcome', async () => {
    const filteredGouges = [mockGouges[1]];
    (api.fetchGouges as jest.Mock).mockResolvedValue({ results: filteredGouges, next: null });

    render(<GougeManagement />);

    fireEvent.change(screen.getByText('All Outcomes'), { target: { value: 'fail' } });

    await waitFor(() => {
      expect(api.fetchGouges).toHaveBeenCalledWith(1, '', expect.objectContaining({ outcome: 'fail' }));
      expect(screen.queryByText('Examiner1')).not.toBeInTheDocument();
      expect(screen.getByText('Examiner2')).toBeInTheDocument();
    });
  });
});