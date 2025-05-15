import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProdutoPage from './pages/ProdutoPage';
import ClientePage from './pages/ClientePage';
import CaixaPage from './pages/CaixaPage';
import { useAuth } from './auth/AuthContext';
import Layout from './layout/Layout';
import ProdutoForm from './components/ProdutoForm';

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/produtos" element={isAuthenticated ? <ProdutoPage /> : <Navigate to="/login" />} />
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="/caixa" element={<CaixaPage />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/produtos" : "/login"} />} />
        <Route path="/produto/novo" element={<ProdutoForm />} />
        <Route path="/produto/:id" element={<ProdutoForm />} />
        
      </Routes>

    </Layout>

  );
}

export default App;