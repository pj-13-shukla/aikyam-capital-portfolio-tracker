import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AddEditCompany from './pages/AddEditCompany';
import CompanyDetail from './pages/CompanyDetail';
import Login from './pages/Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <Navbar />
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ backgroundColor: '#0f172a', minHeight: '100vh' }}>
          <Toaster position="top-right" toastOptions={{
            style: {
              background: '#1e293b',
              color: '#e2e8f0',
              border: '1px solid #334155'
            }
          }} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
            } />
            <Route path="/add" element={
              <ProtectedRoute><AddEditCompany /></ProtectedRoute>
            } />
            <Route path="/edit/:id" element={
              <ProtectedRoute><AddEditCompany /></ProtectedRoute>
            } />
            <Route path="/company/:id" element={
              <ProtectedRoute><CompanyDetail /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;