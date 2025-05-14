import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import api from '../api/api';

const ProdutoPage = () => {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get('/api/Produto')
      .then(res => setProdutos(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Produtos</Typography>
      <List>
        {produtos.map((p) => (
          <ListItem key={p.id}>
            <ListItemText primary={p.nome} secondary={`R$ ${p.precoVenda.toFixed(2)} | Estoque: ${p.estoqueAtual}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ProdutoPage;