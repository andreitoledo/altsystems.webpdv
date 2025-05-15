import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/api';

const ProdutoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [produto, setProduto] = useState({
    nome: '',
    codigoBarras: '',
    descricao: '',
    precoVenda: '',
    precoCusto: '',
    estoqueAtual: '',
    unidade: '',
    ativo: true
  });

  useEffect(() => {
    if (id) {
      api.get(`/api/Produto/${id}`)
        .then(res => setProduto(res.data))
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/api/Produto/${id}`, { id, ...produto });
      } else {
        await api.post('/api/Produto', produto);
      }
      navigate('/produtos');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h5" mb={2}>
        {id ? 'Editar Produto' : 'Novo Produto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="nome" label="Nome" fullWidth required value={produto.nome} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="codigoBarras" label="Código de Barras" fullWidth required value={produto.codigoBarras} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="descricao" label="Descrição" fullWidth value={produto.descricao} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="precoVenda" label="Preço Venda" type="number" fullWidth required value={produto.precoVenda} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="precoCusto" label="Preço Custo" type="number" fullWidth required value={produto.precoCusto} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="estoqueAtual" label="Estoque Atual" type="number" fullWidth required value={produto.estoqueAtual} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField name="unidade" label="Unidade" fullWidth required value={produto.unidade} onChange={handleChange} />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">Salvar</Button>
            <Button onClick={() => navigate('/produtos')} sx={{ ml: 2 }}>Cancelar</Button>
           
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProdutoForm;