import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProdutoPage from './pages/ProdutoPage';
import { useAuth } from './auth/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/produtos" element={isAuthenticated ? <ProdutoPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/produtos" : "/login"} />} />

    </Routes>
  );
}

export default App;