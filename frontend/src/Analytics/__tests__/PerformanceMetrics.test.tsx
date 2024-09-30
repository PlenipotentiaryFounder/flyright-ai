import React from 'react';
import { render, screen } from '@testing-library/react';
import PerformanceMetrics from '../PerformanceMetrics';

const mockData = [
  { metric_type: 'quiz_score', avg_value: 85 },
  { metric_type: 'study_time', avg_value: 120 },
];

describe('PerformanceMetrics', () => {
  it('renders the component with correct title', () => {
    render(<PerformanceMetrics data={mockData} />);
    expect(screen.getByText('Performance Metrics')).toBeInTheDocument();
  });

  // Add more tests as needed
});