import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#0f172a',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #1e3a5f'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ color: '#38bdf8', margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
          📈 Aikyam Capital
        </h1>
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px' }}>
          Dashboard
        </Link>
        <Link to="/add" style={{
          backgroundColor: '#38bdf8',
          color: '#0f172a',
          padding: '8px 16px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          + Add Company
        </Link>
        <button onClick={handleLogout} style={{
          backgroundColor: 'transparent',
          border: '1px solid #ef4444',
          color: '#ef4444',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;