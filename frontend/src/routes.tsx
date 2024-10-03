import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Common/pages/LandingPage';
import Login from './Auth/Pages/Login';
import Register from './Auth/Pages/Register';
import ProfilePage from './Common/pages/ProfilePage';
import Chat from './Chat/Pages/Chat';
import FlashcardsPage from './Flashcards/Pages/FlashcardsPage';
import GougePage from './Gouge/Pages/GougePage';
import MockOralPage from './MockOral/Pages/MockOralPage';
import AnalyticsPage from './Analytics/Pages/AnalyticsPage';
import Dashboard from './Admin/components/Dashboard';
import UserManagement from './Admin/Management/UserManagement';
import MockOralManagement from './MockOral/Management/MockOralManagement';
import GougeManagement from './Gouge/Management/GougeManagement';
import FlashcardManagement from './Flashcards/Management/FlashcardManagement';
import AnalyticsManagement from './Analytics/Management/AnalyticsManagement';
import NotFoundPage from './Common/pages/NotFoundPage';
import PrivateRoute from './Common/Routes/PrivateRoute';
import AdminRoute from './Common/Routes/AdminRoute';
import { AuthProvider } from './Auth/Management/AuthContext';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/landing" element={<LandingPage />} />

      {/* Protected user routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/gouge" element={<GougePage />} />
        <Route path="/mockoral" element={<MockOralPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Route>

      {/* Protected admin routes */}
      <Route element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/mockoral" element={<MockOralManagement />} />
        <Route path="/admin/gouge" element={<GougeManagement />} />
        <Route path="/admin/flashcards" element={<FlashcardManagement />} />
        <Route path="/admin/analytics" element={<AnalyticsManagement />} />
      </Route>

      {/* 404 Not Found route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;