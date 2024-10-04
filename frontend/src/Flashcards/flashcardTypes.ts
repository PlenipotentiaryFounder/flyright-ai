export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  difficulty: 1 | 2 | 3;
  status: boolean;
  created_at: string;
  updated_at: string;
  last_used: string | null;
  times_used: number;
  category: {
    id: number;
    name: string;
  } | null;
  set: {
    id: number;
    name: string;
    creatorType: 'user' | 'flyright';
  };
}