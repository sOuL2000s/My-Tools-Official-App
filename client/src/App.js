// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ToolOnePage from './pages/ToolOnePage';
import ToolTwoPage from './pages/ToolTwoPage';

import './App.css'; // Global styles

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes for Tools */}
            <Route
              path="/tool-one"
              element={
                <ProtectedRoute>
                  <ToolOnePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tool-two"
              element={
                <ProtectedRoute>
                  <ToolTwoPage />
                </ProtectedRoute>
              }
            />

            {/* Fallback for unknown routes */}
            <Route path="*" element={<h1 style={{ textAlign: 'center', marginTop: '50px' }}>404 - Page Not Found</h1>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;