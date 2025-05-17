import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';

const RelatorioVendasPage = () => {
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [relatorio, setRelatorio] = useState([]);

  const buscarRelatorio = async () => {
    if (!inicio || !fim) {
      alert('Informe o período completo');
      return;
    }

    try {
      const response = await api.get(`/api/Relatorio/vendas?inicio=${inicio}&fim=${fim}`);
      setRelatorio(response.data);
    } catch (error) {
      console.error('Erro ao buscar relatório', error);
      alert('Erro ao buscar relatório');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'produto', headerName: 'Produto', flex: 1 },
    { field: 'quantidade', headerName: 'Qtd. Total', width: 130 },
    { field: 'total', headerName: 'Total (R$)', width: 130 },
  ];

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Relatório de Vendas por Produto</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Data Início"
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Data Fim"
          type="date"
          value={fim}
          onChange={(e) => setFim(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={buscarRelatorio}>Buscar</Button>
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={relatorio.map((r, index) => ({
            id: index + 1,
            ...r
          }))}
          columns={columns}
          pageSize={10}
        />
      </div>
    </Container>
  );
};

export default RelatorioVendasPage;