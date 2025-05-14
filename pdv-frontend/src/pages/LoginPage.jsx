import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/Auth/login', { email, senha });
      login(response.data.token);
      navigate('/produtos');
    } catch {
      setErro('Credenciais inválidas');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Typography variant="h4" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Senha" type="password" fullWidth margin="normal" value={senha} onChange={(e) => setSenha(e.target.value)} />
          {erro && <Typography color="error">{erro}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Entrar</Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;