import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProdutoPage from './pages/ProdutoPage';
import ClientePage from './pages/ClientePage';
import CaixaPage from './pages/CaixaPage';
import VendaList from './pages/VendaList';
import VendaDetalhes from './pages/VendaDetalhes';
import { useAuth } from './auth/AuthContext';
import Layout from './layout/Layout';
import ProdutoForm from './components/ProdutoForm';
import ClienteForm from './components/ClienteForm';
import VendaForm from './components/VendaForm';

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
        {/* Produtos */}
        <Route path="/produtos" element={isAuthenticated ? <ProdutoPage /> : <Navigate to="/login" />} />
        <Route path="/produto/novo" element={<ProdutoForm />} />
        <Route path="/produto/:id" element={<ProdutoForm />} />

        {/* Clientes */}
        <Route path="/clientes" element={<ClientePage />} />
        <Route path="cliente/novo" element={<ClienteForm />} />
        <Route path="cliente/:id" element={<ClienteForm />} />

        {/* Venda */}
        <Route path="/vendas" element={<VendaList />} />
        <Route path="/venda/nova" element={<VendaForm />} />
        <Route path="/venda/:id" element={<VendaDetalhes />} />

        {/* Caixa */}
        <Route path="/caixa" element={<CaixaPage />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/produtos" : "/login"} />} />


      </Routes>

    </Layout>

  );
}

export default App;