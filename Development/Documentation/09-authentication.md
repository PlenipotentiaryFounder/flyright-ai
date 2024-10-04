Authentication
The authentication system in our application ensures secure and seamless access for users across all parts of the application. We use JWT (JSON Web Tokens) for token-based authentication or Django's session-based authentication for managing user sessions. This document outlines how authentication is implemented, including login, registration, and protecting routes.

Key Concepts
1. JWT Authentication
JWT (JSON Web Tokens) are used to securely manage authentication tokens. After a successful login, the back-end (Django) issues a JWT, which is stored on the client-side (typically in localStorage or cookies).
All subsequent API requests to protected routes include the JWT in the Authorization header as a Bearer token.
2. Session-Based Authentication (Optional)
Alternatively, Django's built-in session-based authentication can be used to manage user sessions. In this method, the server manages the session and authenticates requests using session cookies.
This method avoids storing tokens on the client-side and can be used where session management is preferred.
3. Protected Routes
Some routes and API endpoints require the user to be authenticated. These protected routes ensure that only logged-in users can access specific parts of the application, such as user profiles or settings pages.
In React, protected routes are implemented using a higher-order component (HOC) that checks the authentication state before allowing access.
JWT Authentication Flow
1. User Registration
The registration process involves sending user data to the back-end (e.g., email, password) to create a new user account. Once registered, the user can log in to receive a JWT.

Registration API Example
tsx
Copy code
// src/services/authService.ts
import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};
2. User Login
Upon successful login, the server responds with a JWT, which is stored on the client side (typically in localStorage). The token is then used for authenticating subsequent requests.

Login API Example
tsx
Copy code
// src/services/authService.ts
export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  // Store the token in localStorage
  localStorage.setItem('token', response.data.token);
  return response.data;
};
3. Storing the JWT
The JWT is stored in localStorage or sessionStorage on the client side. It can also be stored in cookies for additional security measures, depending on the application’s security requirements.

4. Sending the JWT in Requests
For each request to a protected API route, the token is included in the Authorization header:

tsx
Copy code
// src/services/api.ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
5. User Logout
To log out, the JWT is simply removed from localStorage (or cookies), and the user is redirected to the login page.

Logout Example
tsx
Copy code
export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
Session-Based Authentication Flow (Optional)
1. Django Session Management
In session-based authentication, Django manages user sessions on the server side. Upon successful login, Django creates a session and sends a session cookie to the client.
All subsequent API requests include the session cookie, which Django uses to authenticate the user.
2. Advantages of Session-Based Authentication
Session-based authentication avoids storing tokens on the client-side and may be preferred in certain applications where server-side session management is required.
Django automatically handles session expiration and invalidation.
Protected Routes in React
Protected routes ensure that only authenticated users can access certain pages or components. In React, we implement this using a ProtectedRoute component.

ProtectedRoute Component
tsx
Copy code
// src/navigation/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../store/slices/authSlice';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
You can wrap any route that requires authentication with the ProtectedRoute component:

tsx
Copy code
<Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
Front-End Authentication State Management
Authentication state (whether the user is logged in or not) is managed globally in Redux. The login action updates the state with the JWT, while the logout action clears it.

Example: Redux Slice for Authentication
tsx
Copy code
// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser } from '../../services/authService';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const data = await loginUser(credentials);
  return data.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('token', action.payload);
    });
  },
});

export const { logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
Example: Login Component
tsx
Copy code
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
Error Handling
JWT Expiration
If the JWT expires, the server will return a 401 Unauthorized error. This can be caught in an Axios interceptor, and the user can be automatically logged out and redirected to the login page.

tsx
Copy code
api.interceptors.response.use(
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
Best Practices
Token Security: Store JWTs in httpOnly cookies if possible, as they provide additional security compared to localStorage (protecting against XSS attacks). If using localStorage, ensure that your application protects against XSS vulnerabilities.

Refresh Tokens: Implement refresh tokens to renew JWTs without requiring the user to log in again after the token expires. The refresh token can be stored securely and used to obtain new access tokens.

Session Expiration: If using session-based authentication, configure Django to handle session expiration and provide feedback to the user when their session has expired.

Error Handling: Ensure proper error handling in both the front-end and back-end for cases like incorrect login credentials, expired tokens, or unauthorized access.

Conclusion
Our authentication system, whether using JWT-based authentication or Django's session-based approach, ensures secure access to protected routes and API endpoints. By centralizing authentication logic and integrating it with Redux, we maintain a scalable and secure authentication flow for the web application.

