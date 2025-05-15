import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const ClientePage = () => {
  const [clientes, setClientes] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    api.get('/api/Cliente')
      .then(res => {
        const data = res.data
          .filter(c => c.ativo !== false)
          .map(c => ({ ...c, id: c.id || c.Id }));
        setClientes(data);
      })
      .catch(err => console.error(err));
  };

  const inativarCliente = async (id) => {
    if (!window.confirm("Deseja realmente inativar este cliente?")) return;
    await api.put(`/api/Cliente/Inativar/${id}`);
    carregarClientes();
  };

  const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'documento', headerName: 'Documento', flex: 1 },
    { field: 'telefone', headerName: 'Telefone', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'acoes',
      headerName: 'Ações',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Button size="small" variant="outlined" onClick={() => navigate(`/cliente/${params.row.id}`)}>Editar</Button>
          <Button size="small" color="error" onClick={() => inativarCliente(params.row.id)} sx={{ ml: 1 }}>Inativar</Button>
        </Box>
      )
    }
  ];

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Clientes</Typography>
      <Button variant="contained" onClick={() => navigate('/cliente/novo')} sx={{ mb: 2 }}>
        Novo Cliente
      </Button>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={clientes}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
      </div>
    </Container>
  );
};

export default ClientePage;
