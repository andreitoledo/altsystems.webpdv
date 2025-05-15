// src/pages/VendaDetalhes.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import api from '../api/api';

const VendaDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venda, setVenda] = useState(null);

  useEffect(() => {
    const carregarVenda = async () => {
      try {
        const response = await api.get(`/api/Venda/${id}`);
        setVenda(response.data);
        console.log('Venda carregada:', response.data);
      } catch (error) {
        console.error('Erro ao buscar venda:', error);

      }
    };

    carregarVenda();
  }, [id]);

  const columns = [
    { field: 'nomeProduto', headerName: 'Produto', flex: 1 },
    { field: 'quantidade', headerName: 'Qtd.', width: 100 },
    {
      field: 'precoUnitario',
      headerName: 'Preço Unitário',
      width: 150,
      // remover formatter por enquanto
    },
    {
      field: 'subtotal',
      headerName: 'Subtotal',
      width: 150,
      // remover formatter por enquanto
    }
  ];
  


  if (!venda) return <Typography>Carregando...</Typography>;

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 2 }}>
        <Typography variant="h4">Detalhes da Venda #{venda.id}</Typography>
        <Button variant="outlined" onClick={() => navigate('/vendas')}>
          Voltar
        </Button>
      </Box>

      <Typography>Cliente: {venda.cliente?.nome}</Typography>
      <Typography>Data: {new Date(venda.data).toLocaleDateString()}</Typography>
      <Typography sx={{ mb: 2 }}>Total: R$ {Number(venda.total).toFixed(2)}</Typography>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
         rows={venda.itens.map((item, index) => {
          const precoUnitario = Number(item.precoUnitario ?? 0);
          const quantidade = Number(item.quantidade ?? 0);
        
          return {
            id: item.id || index + 1,
            nomeProduto: item.produto?.nome ?? 'N/A',
            quantidade,
            precoUnitario,
            subtotal: quantidade * precoUnitario
          };
        })}
        
          
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </div>
    </Container>
  );
};

export default VendaDetalhes;
