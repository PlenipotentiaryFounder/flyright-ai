import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '@/components/pages/LandingPage';
import Login from '@/components/pages/Login';
import Register from '@/components/pages/Register';
import WelcomePage from '@/components/pages/WelcomePage';
import '@/App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
