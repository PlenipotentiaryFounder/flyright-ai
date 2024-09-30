import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../Auth/Management/AuthContext';

const AdminRoute = () => {
  const { auth } = useAuth();

  return auth?.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
