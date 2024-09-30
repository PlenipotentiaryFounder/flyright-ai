import React from 'react';
import { render, screen } from '@testing-library/react';
import UserGrowth from '../UserGrowth';

const mockData = [
  { date: '2023-01-01', count: 10 },
  { date: '2023-01-02', count: 15 },
];

describe('UserGrowth', () => {
  it('renders the component with correct title', () => {
    render(<UserGrowth data={mockData} />);
    expect(screen.getByText('User Growth')).toBeInTheDocument();
  });

  // Add more tests as needed
});