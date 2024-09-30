import React from 'react';
import Button from "./Button";

const placeholderConversations = [


  'Weather Patterns Discussion',
  'Navigation Techniques',
  'Aircraft Systems Overview',
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-4">Your Conversations</h2>
      <nav className="flex flex-col space-y-4">
        {placeholderConversations.map((convo, index) => (
          <Button key={index} variant="ghost" className="justify-start">
            {convo}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
