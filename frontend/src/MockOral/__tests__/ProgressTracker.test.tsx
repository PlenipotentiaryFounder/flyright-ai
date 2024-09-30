import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressTracker from '../ProgressTracker';

describe('ProgressTracker', () => {
  const mockAcsTopic = [
    { id: 1, name: 'Topic 1', status: 'completed' },
    { id: 2, name: 'Topic 2', status: 'unsatisfactory' },
    { id: 3, name: 'Topic 3', status: 'unanswered' },
  ];

  it('renders with acsTopic when currentSession is null', () => {
    render(<ProgressTracker acsTopic={mockAcsTopic} currentSession={null} />);
    expect(screen.getByText('Progress Tracker')).toBeInTheDocument();
    expect(screen.getByText('1 of 3 topics completed')).toBeInTheDocument();
    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Topic 2')).toBeInTheDocument();
    expect(screen.getByText('Topic 3')).toBeInTheDocument();
  });

  it('renders with currentSession when provided', () => {
    const mockCurrentSession = [
      { id: 1, name: 'Session Topic 1', status: 'completed' },
      { id: 2, name: 'Session Topic 2', status: 'completed' },
    ];
    render(<ProgressTracker acsTopic={mockAcsTopic} currentSession={mockCurrentSession} />);
    expect(screen.getByText('2 of 2 topics completed')).toBeInTheDocument();
    expect(screen.getByText('Session Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Session Topic 2')).toBeInTheDocument();
  });
});