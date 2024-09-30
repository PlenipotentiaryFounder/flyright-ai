import axios from 'axios';
import * as api from '../api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUsers', () => {
    it('fetches users successfully', async () => {
      const mockUsers = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
      mockedAxios.get.mockResolvedValue({ data: { results: mockUsers, next: null } });

      const result = await api.fetchUsers();

      expect(mockedAxios.get).toHaveBeenCalledWith('/admin-api/users/?page=1');
      expect(result).toEqual({ results: mockUsers, next: null });
    });

    it('handles errors when fetching users', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(api.fetchUsers()).rejects.toThrow('Network error');
    });
  });

  describe('createUser', () => {
    it('creates a user successfully', async () => {
      const newUser = { username: 'newuser', email: 'newuser@example.com' };
      const createdUser = { id: 3, ...newUser };
      mockedAxios.post.mockResolvedValue({ data: createdUser });

      const result = await api.createUser(newUser);

      expect(mockedAxios.post).toHaveBeenCalledWith('/admin-api/users/', newUser);
      expect(result).toEqual(createdUser);
    });

    it('handles errors when creating a user', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Invalid data'));

      await expect(api.createUser({})).rejects.toThrow('Invalid data');
    });
  });

  // Add similar tests for other API functions (updateUser, deleteUser, etc.)

  describe('fetchMockOrals', () => {
    it('fetches mock orals successfully', async () => {
      const mockMockOrals = [{ id: 1, examiner_name: 'Examiner1' }, { id: 2, examiner_name: 'Examiner2' }];
      mockedAxios.get.mockResolvedValue({ data: { results: mockMockOrals, next: null } });

      const result = await api.fetchMockOrals();

      expect(mockedAxios.get).toHaveBeenCalledWith('/admin-api/mock-orals/?page=1');
      expect(result).toEqual({ results: mockMockOrals, next: null });
    });

    // Add more tests for fetchMockOrals with different parameters and error cases
  });

  // Add tests for other mock oral related functions (approveMockOral, rejectMockOral, deleteMockOral)

  describe('fetchGouges', () => {
    it('fetches gouges successfully', async () => {
      const mockGouges = [{ id: 1, examiner_name: 'Examiner1' }, { id: 2, examiner_name: 'Examiner2' }];
      mockedAxios.get.mockResolvedValue({ data: { results: mockGouges, next: null } });

      const result = await api.fetchGouges();

      expect(mockedAxios.get).toHaveBeenCalledWith('/admin-api/gouges/?page=1');
      expect(result).toEqual({ results: mockGouges, next: null });
    });

    // Add more tests for fetchGouges with different parameters and error cases
  });

  // Add tests for other gouge related functions (createGouge, updateGouge, deleteGouge)

  describe('fetchFlashcardDecks', () => {
    it('fetches flashcard decks successfully', async () => {
      const mockDecks = [{ id: 1, name: 'Deck1' }, { id: 2, name: 'Deck2' }];
      mockedAxios.get.mockResolvedValue({ data: { results: mockDecks, next: null } });

      const result = await api.fetchFlashcardDecks();

      expect(mockedAxios.get).toHaveBeenCalledWith('/admin-api/flashcard-decks/?page=1');
      expect(result).toEqual({ results: mockDecks, next: null });
    });

    // Add more tests for fetchFlashcardDecks with different parameters and error cases
  });

  // Add tests for other flashcard related functions (createFlashcardDeck, updateFlashcardDeck, deleteFlashcardDeck, fetchFlashcards, etc.)

  describe('fetchAnalytics', () => {
    it('fetches analytics data successfully', async () => {
      const mockAnalytics = { user_growth: [], user_activities: [], performance_metrics: [] };
      mockedAxios.get.mockResolvedValue({ data: mockAnalytics });

      const result = await api.fetchAnalytics();

      expect(mockedAxios.get).toHaveBeenCalledWith('/admin-api/analytics/');
      expect(result).toEqual(mockAnalytics);
    });

    it('handles errors when fetching analytics', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      await expect(api.fetchAnalytics()).rejects.toThrow('Network error');
    });
  });
});