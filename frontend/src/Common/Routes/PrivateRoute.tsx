import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Auth/Management/AuthContext';

const PrivateRoute = () => {
  const { auth } = useAuth();

  return auth?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
