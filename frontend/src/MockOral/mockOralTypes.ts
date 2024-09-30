export interface MockOralSession {
  id: number;
  topics: Topic[];
  examiner_name: string;
  created_at: string;
  score: number | null;
  status: 'pass' | 'fail' | null;
  topics_covered: string;
  questions_asked: string;
}

export interface Topic {
  id: number;
  name: string;
  status: 'completed' | 'unsatisfactory' | 'unanswered';
}