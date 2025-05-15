import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Grid
} from '@mui/material';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const VendaForm = () => {
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [itens, setItens] = useState([{ produtoId: '', quantidade: 1 }]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/Cliente').then(res => setClientes(res.data));
    api.get('/api/Produto').then(res => setProdutos(res.data));
  }, []);

  const handleChangeItem = (index, field, value) => {
    const novaLista = [...itens];
    novaLista[index][field] = value;
    setItens(novaLista);
  };

  const adicionarItem = () => {
    setItens([...itens, { produtoId: '', quantidade: 1 }]);
  };

  const removerItem = (index) => {
    const novaLista = [...itens];
    novaLista.splice(index, 1);
    setItens(novaLista);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/Venda', {
        clienteId,
        itens: itens.map(item => ({
          produtoId: Number(item.produtoId),
          quantidade: Number(item.quantidade)
        }))
      });
      alert('Venda registrada com sucesso!');
      navigate('/vendas');
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar venda.');
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Registrar Venda</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          fullWidth
          label="Cliente"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          margin="normal"
          required
        >
          {clientes.map(c => (
            <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
          ))}
        </TextField>

        {itens.map((item, index) => (
          <Grid container spacing={2} alignItems="center" key={index}>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Produto"
                value={item.produtoId}
                onChange={(e) => handleChangeItem(index, 'produtoId', e.target.value)}
                margin="normal"
                required
              >
                {produtos.map(p => (
                  <MenuItem key={p.id} value={p.id}>{p.nome}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                label="Quantidade"
                fullWidth
                value={item.quantidade}
                onChange={(e) => handleChangeItem(index, 'quantidade', e.target.value)}
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={2}>
              <Button onClick={() => removerItem(index)} color="error" sx={{ mt: 2 }}>Remover</Button>
            </Grid>
          </Grid>
        ))}

        <Button onClick={adicionarItem} variant="outlined" sx={{ mt: 2 }}>Adicionar Produto</Button>

        <Box mt={3}>
          <Button type="submit" variant="contained">Salvar Venda</Button>
        </Box>
      </form>
    </Box>
  );
};

export default VendaForm;
