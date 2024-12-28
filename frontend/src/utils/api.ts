import axios from 'axios'
import { AnalyticsData } from '../Analytics/types/analyticsTypes'; // Import the AnalyticsData type
import { FlashcardCategory, FlashcardSet, Flashcard } from '../Flashcards/flashcardTypes';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
})

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchAnalytics = async (): Promise<AnalyticsData> => {
  const response = await api.get<AnalyticsData>('/api/dashboard/summary/');
  return response.data;
};

// Flashcard Categories
export const fetchFlashcardCategories = () => 
  axios.get(`${API_BASE_URL}/flashcard-categories/`).then(response => response.data);

// Flashcard Sets
export const fetchFlashcardSets = async (page = 1) => {
  const response = await axios.get(`/api/flashcard-sets/?page=${page}`);
  return response.data;
};

export const createFlashcardSet = async (setData: Partial<FlashcardSet>): Promise<FlashcardSet> => {
  const response = await api.post<FlashcardSet>('/api/flashcard-sets/', setData);
  return response.data;
};

// Flashcards
export const fetchFlashcards = async (setId: number) => {
  const response = await axios.get(`/api/flashcard-sets/${setId}/flashcards/`);
  return { results: response.data }; // Wrap the response in a results object
};

export const createFlashcard = async (setId: number, data: Partial<Flashcard>) => {
  const response = await axios.post(`/api/flashcard-sets/${setId}/flashcards/`, data);
  return response.data;
};

export const updateFlashcardSet = async (setId: number, data: Partial<FlashcardSet>) => {
  const response = await axios.put(`/api/flashcard-sets/${setId}/`, data);
  return response.data;
};

export const deleteFlashcardSet = async (setId: number) => {
  await axios.delete(`/api/flashcard-sets/${setId}/`);
};

export const updateFlashcard = async (setId: number, flashcardId: number, data: Partial<Flashcard>) => {
  const response = await axios.put(`/api/flashcard-sets/${setId}/flashcards/${flashcardId}/`, data);
  return response.data;
};

export const deleteFlashcard = async (setId: number, flashcardId: number) => {
  await axios.delete(`/api/flashcard-sets/${setId}/flashcards/${flashcardId}/`);
};

export default api