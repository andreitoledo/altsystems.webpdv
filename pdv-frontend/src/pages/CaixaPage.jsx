import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';

const CaixaPage = () => {
  const [movimentos, setMovimentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarMovimentos();
  }, []);

  const carregarMovimentos = async () => {
    try {
      const response = await api.get('/api/MovimentoCaixa');
      const formatados = response.data.map((m) => ({
        id: m.id,
        data: new Date(m.data).toLocaleString(),
        valor: m.valor.toFixed(2),
        tipo: m.tipo,
        descricao: m.descricao,
      }));
      setMovimentos(formatados);
    } catch (error) {
      console.error('Erro ao carregar movimentos de caixa:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'data', headerName: 'Data', width: 180 },
    { field: 'tipo', headerName: 'Tipo', width: 120 },
    { field: 'descricao', headerName: 'Descrição', flex: 1 },
    { field: 'valor', headerName: 'Valor (R$)', width: 130 },
  ];

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4">Movimento de Caixa</Typography>
        <Button variant="contained" onClick={() => navigate('/caixa/movimento')}>
          Novo Lançamento
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

export default CaixaPage;
