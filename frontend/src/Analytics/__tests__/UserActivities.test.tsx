import React from 'react';
import { render, screen } from '@testing-library/react';
import UserActivities from '../UserActivities';

const mockData = [
  { activity_type: 'login', count: 100 },
  { activity_type: 'quiz_taken', count: 50 },
];

describe('UserActivities', () => {
  it('renders the component with correct title', () => {
    render(<UserActivities data={mockData} />);
    expect(screen.getByText('User Activities')).toBeInTheDocument();
  });

  // Add more tests as needed
});