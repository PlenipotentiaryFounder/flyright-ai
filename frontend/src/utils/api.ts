import axios from 'axios'
import { AnalyticsData } from '../Analytics/types/analyticsTypes'; // Import the AnalyticsData type

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
})

export const fetchAnalytics = async (): Promise<AnalyticsData> => {
  const response = await api.get<AnalyticsData>('/api/dashboard/summary/');
  return response.data;
};

export default api