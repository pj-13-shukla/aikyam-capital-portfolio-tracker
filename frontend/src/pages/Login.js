import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    const success = login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials. Try admin / password123');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        padding: '48px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ color: '#38bdf8', textAlign: 'center', marginTop: 0, fontSize: '24px' }}>
          📈 Aikyam Capital
        </h1>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '32px', fontSize: '14px' }}>
          Portfolio Tracker — Sign In
        </p>

        {error && (
          <div style={{
            backgroundColor: '#450a0a',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            color: '#ef4444',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="admin"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#94a3b8', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            style={inputStyle}
          />
        </div>

        <button onClick={handleLogin} style={{
          width: '100%',
          backgroundColor: '#38bdf8',
          color: '#0f172a',
          border: 'none',
          padding: '14px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          Sign In
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  backgroundColor: '#0f172a',
  border: '1px solid #334155',
  borderRadius: '8px',
  padding: '12px',
  color: '#e2e8f0',
  fontSize: '14px',
  boxSizing: 'border-box',
};

export default Login;