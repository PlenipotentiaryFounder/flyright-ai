import axios from 'axios';
import { setupAxiosInterceptors } from './auth';
import { User, MockOralSession } from '../types';

const API_URL = '/admin-api';

setupAxiosInterceptors();

export const fetchDashboardSummary = async () => {
  const response = await axios.get(`${API_URL}/dashboard/summary/`);
  return response.data;
};

export const fetchUsers = async (page: number = 1, search: string = '', filters: { is_staff?: boolean, is_active?: boolean } = {}): Promise<PaginatedResponse<User>> => {
  let url = `${API_URL}/users/?page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (filters.is_staff !== undefined) {
    url += `&is_staff=${filters.is_staff}`;
  }
  if (filters.is_active !== undefined) {
    url += `&is_active=${filters.is_active}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await axios.post(`${API_URL}/users/`, userData);
  return response.data;
};

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  const response = await axios.patch(`${API_URL}/users/${userId}/`, userData);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${API_URL}/users/${userId}/`);
};

export const fetchMockOrals = async (page: number = 1, search: string = '', filters: { status?: string } = {}): Promise<PaginatedResponse<MockOralSession>> => {
  let url = `${API_URL}/mock-orals/?page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (filters.status) {
    url += `&status=${filters.status}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const approveMockOral = async (id: number): Promise<void> => {
  await axios.post(`${API_URL}/mock-orals/${id}/approve/`);
};

export const rejectMockOral = async (id: number): Promise<void> => {
  await axios.post(`${API_URL}/mock-orals/${id}/reject/`);
};

export const deleteMockOral = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/mock-orals/${id}/`);
};

export const fetchGouges = async (page: number = 1, search: string = '', filters: { outcome?: string, start_date?: string, end_date?: string } = {}): Promise<PaginatedResponse<Gouge>> => {
  let url = `${API_URL}/gouges/?page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (filters.outcome) {
    url += `&outcome=${filters.outcome}`;
  }
  if (filters.start_date) {
    url += `&start_date=${filters.start_date}`;
  }
  if (filters.end_date) {
    url += `&end_date=${filters.end_date}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const createGouge = async (gougeData: Partial<Gouge>): Promise<Gouge> => {
  const response = await axios.post(`${API_URL}/gouges/`, gougeData);
  return response.data;
};

export const updateGouge = async (gougeId: number, gougeData: Partial<Gouge>): Promise<Gouge> => {
  const response = await axios.patch(`${API_URL}/gouges/${gougeId}/`, gougeData);
  return response.data;
};

export const deleteGouge = async (gougeId: number): Promise<void> => {
  await axios.delete(`${API_URL}/gouges/${gougeId}/`);
};

export const fetchFlashcardDecks = async (page: number = 1, search: string = '', filters: { min_cards?: number, max_cards?: number } = {}): Promise<PaginatedResponse<FlashcardDeck>> => {
  let url = `${API_URL}/flashcard-decks/?page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  if (filters.min_cards) {
    url += `&min_cards=${filters.min_cards}`;
  }
  if (filters.max_cards) {
    url += `&max_cards=${filters.max_cards}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const createFlashcardDeck = async (deckData: Partial<FlashcardDeck>): Promise<FlashcardDeck> => {
  const response = await axios.post(`${API_URL}/flashcard-decks/`, deckData);
  return response.data;
};

export const updateFlashcardDeck = async (deckId: number, deckData: Partial<FlashcardDeck>): Promise<FlashcardDeck> => {
  const response = await axios.patch(`${API_URL}/flashcard-decks/${deckId}/`, deckData);
  return response.data;
};

export const deleteFlashcardDeck = async (deckId: number): Promise<void> => {
  await axios.delete(`${API_URL}/flashcard-decks/${deckId}/`);
};

export const fetchFlashcards = async (deckId: number, page: number = 1, search: string = ''): Promise<PaginatedResponse<Flashcard>> => {
  let url = `${API_URL}/flashcards/?deck_id=${deckId}&page=${page}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  const response = await axios.get(url);
  return response.data;
};

export const createFlashcard = async (deckId: number, flashcardData: Partial<Flashcard>): Promise<Flashcard> => {
  const response = await axios.post(`${API_URL}/flashcard-decks/${deckId}/flashcards/`, flashcardData);
  return response.data;
};

export const updateFlashcard = async (deckId: number, flashcardId: number, flashcardData: Partial<Flashcard>): Promise<Flashcard> => {
  const response = await axios.patch(`${API_URL}/flashcard-decks/${deckId}/flashcards/${flashcardId}/`, flashcardData);
  return response.data;
};

export const deleteFlashcard = async (deckId: number, flashcardId: number): Promise<void> => {
  await axios.delete(`${API_URL}/flashcard-decks/${deckId}/flashcards/${flashcardId}/`);
};

export const fetchAnalytics = async () => {
  const response = await axios.get(`${API_URL}/analytics/`);
  return response.data;
};

export const createMockOral = async (data: any) => {
  // implementation
};

export const updateMockOral = async (id: number, data: any) => {
  // implementation
};

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Gouge {
  id: number;
  examiner_name: string;
  date: string;
  outcome: string;
  text: string;
}

export interface FlashcardDeck {
  id: number;
  name: string;
  description: string;
  flashcard_count: number;
}

export interface Flashcard {
  id: number;
  deck: number;
  question: string;
  answer: string;
}