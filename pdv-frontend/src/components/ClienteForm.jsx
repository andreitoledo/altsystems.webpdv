import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Button, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

const ClienteForm = () => {
  const [cliente, setCliente] = useState({
    nome: '',
    documento: '',
    telefone: '',
    email: '',
    ativo: true
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/api/Cliente/${id}`)
        .then(res => setCliente(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/api/Cliente/${id}`, cliente);
      } else {
        await api.post('/api/Cliente', cliente);
      }
      navigate('/clientes');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar cliente');
    }
  };

  return (
    <Container>
      <Typography variant="h5" mt={4} mb={2}>{id ? 'Editar Cliente' : 'Novo Cliente'}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nome"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          required
        />
        <TextField
          label="Documento"
          name="documento"
          value={cliente.documento}
          onChange={handleChange}
          required
        />
        <TextField
          label="Telefone"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained">Salvar</Button>
          <Button variant="outlined" sx={{ ml: 2 }} onClick={() => navigate('/clientes')}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClienteForm;
