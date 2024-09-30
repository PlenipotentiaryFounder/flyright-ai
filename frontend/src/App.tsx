import React from 'react';
import AppRoutes from './routes'; // Ensure the correct path to your routes
import Login from './Auth/Pages/Login';
import Register from './Auth/Pages/Register';
import MockOralPage from './MockOral/Pages/MockOralPage';

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;