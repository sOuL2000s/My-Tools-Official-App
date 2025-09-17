// client/src/pages/HomePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Welcome to My Tools!</h1>
      {currentUser ? (
        <p>Hello, {currentUser.email}! You are logged in.</p>
      ) : (
        <p>Please log in or register to access the tools.</p>
      )}
      <p>This is your central dashboard. Navigate to different tools using the navbar.</p>
    </div>
  );
};

export default HomePage;