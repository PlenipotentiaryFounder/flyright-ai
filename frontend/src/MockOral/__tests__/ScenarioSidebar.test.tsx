import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScenarioSidebar from '../ScenarioSidebar';

describe('ScenarioSidebar', () => {
  const mockHandleDocumentUpload = jest.fn();
  const mockHandleGenerateDebriefing = jest.fn();

  beforeEach(() => {
    render(
      <ScenarioSidebar
        handleDocumentUpload={mockHandleDocumentUpload}
        handleGenerateDebriefing={mockHandleGenerateDebriefing}
      />
    );
  });

  it('renders the scenario', () => {
    expect(screen.getByText('Scenario')).toBeInTheDocument();
    expect(screen.getByText(/You are preparing for a cross-country flight/)).toBeInTheDocument();
  });

  it('renders the upload document button', () => {
    const uploadButton = screen.getByText('Upload Document');
    expect(uploadButton).toBeInTheDocument();
    fireEvent.click(uploadButton);
    expect(mockHandleDocumentUpload).toHaveBeenCalled();
  });

  it('renders the ACS topics', () => {
    expect(screen.getByText('ACS Topics')).toBeInTheDocument();
    expect(screen.getByText('Pilot Qualifications')).toBeInTheDocument();
    expect(screen.getByText('Airworthiness Requirements')).toBeInTheDocument();
  });

  it('renders the generate debriefing button', () => {
    const debriefingButton = screen.getByText('Generate Debriefing Report');
    expect(debriefingButton).toBeInTheDocument();
    fireEvent.click(debriefingButton);
    expect(mockHandleGenerateDebriefing).toHaveBeenCalled();
  });
});