export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  date_joined: string;
}

export interface MockOralSession {
  id: number;
  examiner_name: string;
  created_at: string;
  score: number | null;
  status: string | null;
}