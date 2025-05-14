import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const ProdutoPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    api.get('/api/Produto')
      .then(res => {
        const produtosComId = res.data
          .filter(p => p.ativo !== false)
          .map(p => ({
            ...p,
            id: p.id || p.Id,
            precoVenda: Number(p.precoVenda),
            precoCusto: Number(p.precoCusto),
            totalEstoque: Number(p.precoVenda) * Number(p.estoqueAtual),
          }));

        console.log('Produtos formatados:', produtosComId);
        setProdutos(produtosComId);
      })
      .catch(err => console.error(err));
  };

  const inativarProduto = async (id) => {
    if (!window.confirm("Deseja realmente inativar este produto?")) return;
    await api.put(`/api/Produto/Inativar/${id}`);
    carregarProdutos();
  };

  const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'codigoBarras', headerName: 'Código de Barras', flex: 1 },
    {
      field: 'precoVenda',
      headerName: 'Preço Venda',
      flex: 1
    },
    {
      field: 'precoCusto',
      headerName: 'Preço Custo',
      flex: 1
    },
    
    // {
    //   field: 'precoVenda',
    //   headerName: 'Preço Venda',
    //   flex: 1,
    //   valueFormatter: ({ value }) =>
    //     !isNaN(value) ? `R$ ${Number(value).toFixed(2).replace('.', ',')}` : 'R$ 0,00'
    // },
    // {
    //   field: 'precoCusto',
    //   headerName: 'Preço Custo',
    //   flex: 1,
    //   valueFormatter: ({ value }) =>
    //     !isNaN(value) ? `R$ ${Number(value).toFixed(2).replace('.', ',')}` : 'R$ 0,00'
    // },
    // {
    //   field: 'totalEstoque',
    //   headerName: 'Total em Estoque',
    //   flex: 1,
    //   valueFormatter: ({ value }) =>
    //     !isNaN(value) ? `R$ ${Number(value).toFixed(2).replace('.', ',')}` : 'R$ 0,00'
    // },
    { field: 'estoqueAtual', headerName: 'Estoque', flex: 1 },
    {
      field: 'acoes',
      headerName: 'Ações',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button size="small" variant="outlined" onClick={() => navigate(`/produto/${params.row.id}`)}>Editar</Button>
          <Button size="small" color="error" onClick={() => inativarProduto(params.row.id)} sx={{ ml: 1 }}>Inativar</Button>
        </Box>
      )
    }
  ];

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Produtos</Typography>
      <Button variant="contained" onClick={() => navigate('/produto/novo')} sx={{ mb: 2 }}>
        Novo Produto
      </Button>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={produtos}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
      </div>
    </Container>
  );
};

export default ProdutoPage;
