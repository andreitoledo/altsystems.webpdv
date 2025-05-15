import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';

const VendaList = () => {
  const [vendas, setVendas] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    carregarVendas();
  }, []);

  const carregarVendas = async () => {
    try {
      const response = await api.get('/api/Venda');
      const formatadas = response.data.map(v => ({
        id: v.id,
        data: new Date(v.data).toLocaleDateString(),
        cliente: v.cliente?.nome || `#${v.clienteId}`,
        total: v.total.toFixed(2),
        itens: v.itens.length
      }));
      setVendas(formatadas);
    } catch (error) {
      console.error('Erro ao carregar vendas', error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'data', headerName: 'Data', width: 130 },
     { field: 'cliente', headerName: 'Cliente', flex: 1,  },
    //{ field: 'cliente', headerName: 'Cliente', flex: 1, valueGetter: (params) => params.row.cliente?.nome },

    { field: 'itens', headerName: 'Qtd. Itens', width: 120 },
    { field: 'total', headerName: 'Total (R$)', width: 120 },

    {
        field: 'acoes',
        headerName: 'Ações',
        width: 150,
        renderCell: (params) => (
          <Button variant="outlined" onClick={() => navigate(`/venda/${params.row.id}`)}>
            Ver Detalhes
          </Button>
        )
      }
      
  ];

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Vendas Realizadas</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" onClick={() => navigate('/venda/nova')}>
          Nova Venda
        </Button>
      </Box>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={vendas}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </div>
    </Container>
  );
};

export default VendaList;
