import React, { useState } from 'react';

interface FlashcardFormProps {
  onSubmit: (flashcard: { question: string; answer: string }) => void;
  initialValues?: { question: string; answer: string };
}

const FlashcardForm: React.FC<FlashcardFormProps> = ({ onSubmit, initialValues }) => {
  const [question, setQuestion] = useState(initialValues?.question || '');
  const [answer, setAnswer] = useState(initialValues?.answer || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ question, answer });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="answer">Answer:</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Flashcard</button>
    </form>
  );
};

export default FlashcardForm;