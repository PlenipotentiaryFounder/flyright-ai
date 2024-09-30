import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AnalyticsPage from '../Pages/AnalyticsPage';
import api from '../../../utils/api';

jest.mock('../../../utils/api');

const mockAnalyticsData = {
  user_growth: [{ date: '2023-01-01', count: 10 }],
  user_activities: [{ activity_type: 'login', count: 100 }],
  performance_metrics: [{ metric_type: 'quiz_score', avg_value: 85 }],
};

describe('AnalyticsPage', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: mockAnalyticsData });
  });

  it('renders loading state initially', () => {
    render(<AnalyticsPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders analytics data after loading', async () => {
    render(<AnalyticsPage />);
    await waitFor(() => {
      expect(screen.getByText('Analytics Dashboard')).toBeInTheDocument();
      expect(screen.getByText('User Growth')).toBeInTheDocument();
      expect(screen.getByText('User Activities')).toBeInTheDocument();
      expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('API Error'));
    render(<AnalyticsPage />);
    await waitFor(() => {
      expect(screen.getByText(/failed to load analytics data/i)).toBeInTheDocument();
    });
  });
});