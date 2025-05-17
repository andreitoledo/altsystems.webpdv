import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Box, TextField, Button, MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';

const MovimentoCaixaPage = () => {
  const [movimentos, setMovimentos] = useState([]);
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    carregarMovimentos();
  }, []);

  const carregarMovimentos = async () => {
    try {
      const response = await api.get('/api/MovimentoCaixa');
      setMovimentos(response.data);
    } catch (error) {
      console.error('Erro ao carregar movimentos:', error);
    }
  };

  const salvarMovimento = async () => {
    try {
      const dto = {
        tipo,
        descricao,
        valor: parseFloat(valor),
      };

      await api.post('/api/MovimentoCaixa', dto);
      setTipo('');
      setDescricao('');
      setValor('');
      carregarMovimentos();
    } catch (error) {
      console.error('Erro ao salvar movimento:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'data',
      headerName: 'Data',
      width: 150
      //valueFormatter: ({ value }) => new Date(value).toLocaleString(),
    },
    { field: 'tipo', headerName: 'Tipo', width: 120 },
    { field: 'descricao', headerName: 'Descrição', flex: 1 },
    {
      field: 'valor',
      headerName: 'Valor (R$)',
      width: 120
      //valueFormatter: ({ value }) => value.toFixed(2),
    },
  ];

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>
        Movimento de Caixa
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          select
          label="Tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="Entrada">Entrada</MenuItem>
          <MenuItem value="Saída">Saída</MenuItem>
        </TextField>

        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          fullWidth
        />

        <TextField
          label="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          sx={{ width: 150 }}
        />

        <Button variant="contained" onClick={salvarMovimento}>
          Registrar
        </Button>
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={movimentos}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>
    </Container>
  );
};

export default MovimentoCaixaPage;
