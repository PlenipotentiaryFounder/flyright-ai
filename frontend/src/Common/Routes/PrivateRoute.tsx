import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  // During development, always render the child routes
  return <Outlet />;

  // The original authentication check can be commented out:
  /*
  const isAuthenticated = checkIfUserIsAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  */
};

export default PrivateRoute;
