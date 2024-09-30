import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = '/admin-api';

// Add your authentication functions here
// For example:
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  const token = response.data.token;
  localStorage.setItem('token', token);
  return jwtDecode(token) as any;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Token is invalid or expired, logout the user
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

// Add other auth-related functions as needed