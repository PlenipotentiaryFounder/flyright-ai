import React, { useState } from 'react';
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';
import { PlaneTakeoff, LogOut, MessageCircle, Settings } from 'lucide-react';

// Function to save the selection to local storage and optionally to the backend
const saveSelection = (selection: string) => {
  localStorage.setItem('userJourney', selection);
  // Optional: Send the selection to the backend
  fetch('http://localhost:8000/api/save-selection/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ journey: selection }),
  }).catch((error) => console.error('Failed to save selection:', error));
};

export default function WelcomePage() {
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);

  const journeyOptions = [
    "I'm a Student Pilot",
    "I'm a Private Pilot",
    "I'm a Commercial Pilot",
    "I'm an ATP Pilot"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 flex flex-col">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlaneTakeoff className="h-6 w-6 text-sky-600" />
          <span className="text-xl font-semibold text-sky-700">Pilot AI</span>
        </div>
        <Button variant="ghost" size="icon" aria-label="Logout">
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-6 bg-white/80 backdrop-blur-sm">
          <h1 className="text-2xl font-bold text-center text-sky-800 mb-4">
            Welcome to Pilot AI, your journey to the skies starts here!
          </h1>
          <p className="text-center text-sky-600 mb-6">
            Tell us where you are in your pilot journey so we can tailor the experience to your needs.
          </p>
          <div className="space-y-3">
            {journeyOptions.map((option) => (
              <Button
                key={option}
                variant={selectedJourney === option ? "default" : "outline"}
                className="w-full justify-start text-left h-auto py-3 px-4 transition-all hover:bg-sky-50 hover:border-sky-200 hover:shadow-md"
                onClick={() => {
                  setSelectedJourney(option);
                  saveSelection(option);
                }}
              >
                {option}
              </Button>
            ))}
          </div>
          {selectedJourney && (
            <p className="mt-4 text-center text-sky-700">
              Great! We'll customize your experience for {selectedJourney.toLowerCase()}.
            </p>
          )}
        </Card>
      </main>

      <footer className="p-4 text-center text-sm text-sky-600">
        <a href="#" className="hover:underline">Privacy Policy</a>
        {' • '}
        <a href="#" className="hover:underline">Terms of Service</a>
        {' • '}
        <a href="#" className="hover:underline">Support</a>
      </footer>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full bg-white shadow-lg hover:bg-sky-50"
        aria-label="Quick Help"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="fixed top-16 right-4 rounded-full bg-white shadow-lg hover:bg-sky-50"
        aria-label="Settings"
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}