
import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, TextField, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';

const VendaPage = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [itens, setItens] = useState([]);
  const [produtoId, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const resClientes = await api.get('/api/Cliente');
    const resProdutos = await api.get('/api/Produto');
    setClientes(resClientes.data);
    setProdutos(resProdutos.data);
  };

  const adicionarItem = () => {
    const produto = produtos.find(p => p.id === parseInt(produtoId));
    if (!produto) return;

    setItens([...itens, {
      produtoId: produto.id,
      nome: produto.nome,
      preco: produto.precoVenda,
      quantidade: quantidade,
      subtotal: quantidade * produto.precoVenda
    }]);

    setProdutoId('');
    setQuantidade(1);
  };

  const salvarVenda = async () => {
    const dto = {
      clienteId: parseInt(clienteId),
      itens: itens.map(i => ({
        produtoId: i.produtoId,
        quantidade: i.quantidade
      }))
    };

    await api.post('/api/Venda', dto);
    alert('Venda registrada com sucesso!');
    setItens([]);
    setClienteId('');
  };

  const columns = [
    { field: 'nome', headerName: 'Produto', flex: 1 },
    { field: 'quantidade', headerName: 'Qtd.', width: 90 },
    { field: 'preco', headerName: 'Preço Unit.', width: 120, valueFormatter: ({ value }) => `R$ ${value.toFixed(2)}` },
    { field: 'subtotal', headerName: 'Subtotal', width: 120, valueFormatter: ({ value }) => `R$ ${value.toFixed(2)}` }
  ];

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Nova Venda</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          select
          label="Cliente"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          fullWidth
        >
          {clientes.map((c) => (
            <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
          ))}
        </TextField>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          select
          label="Produto"
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          fullWidth
        >
          {produtos.map((p) => (
            <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Quantidade"
          type="number"
          value={quantidade}
          onChange={(e) => setQuantidade(parseInt(e.target.value))}
          sx={{ width: 120 }}
        />

        <Button variant="contained" onClick={adicionarItem}>Adicionar</Button>
      </Box>

      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={itens.map((item, idx) => ({ id: idx + 1, ...item }))}
          columns={columns}
          pageSize={5}
        />
      </div>

      <Box mt={2}>
        <Typography variant="h6">
          Total: R$ {itens.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)}
        </Typography>
      </Box>

      <Button variant="contained" sx={{ mt: 2 }} onClick={salvarVenda}>
        Finalizar Venda
      </Button>
    </Container>
  );
};

export default VendaPage;
