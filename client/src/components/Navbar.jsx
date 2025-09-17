// client/src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Optional: for basic styling

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      alert('Failed to log out');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">My Tools</Link>
      </div>
      <ul className="navbar-links">
        {currentUser ? (
          <>
            <li><Link to="/tool-one">AI Chatbot</Link></li>
            <li><Link to="/tool-two">Tool Two</Link></li>
            <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;