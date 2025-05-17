import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import api from '../api/api';

const FechamentoCaixaPage = () => {
  const [fechamentos, setFechamentos] = useState([]);
  const [responsavel, setResponsavel] = useState('');

  const carregarFechamentos = async () => {
    try {
      const response = await api.get('/api/FechamentoCaixa');
      setFechamentos(response.data);
    } catch (err) {
      console.error('Erro ao carregar fechamentos:', err);
    }
  };

  const registrarFechamento = async () => {
    if (!responsavel.trim()) return alert('Informe o responsável');

    try {
      await api.post('/api/FechamentoCaixa', { responsavel });
      setResponsavel('');
      carregarFechamentos();
    } catch (err) {
      console.error('Erro ao registrar fechamento:', err);
    }
  };

  useEffect(() => {
    carregarFechamentos();
  }, []);

  return (
    <Container>
      <Typography variant="h4" mt={4} mb={2}>Fechamento de Caixa</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          label="Responsável"
          value={responsavel}
          onChange={(e) => setResponsavel(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={registrarFechamento}>
          Registrar
        </Button>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Responsável</TableCell>
            <TableCell>Total Entradas</TableCell>
            <TableCell>Total Saídas</TableCell>
            <TableCell>Saldo Final</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fechamentos.map((f) => (
            <TableRow key={f.id}>
              <TableCell>{f.id}</TableCell>
              <TableCell>{new Date(f.data).toLocaleString()}</TableCell>
              <TableCell>{f.responsavel}</TableCell>
              <TableCell>{f.totalEntradas}</TableCell>
              <TableCell>{f.totalSaidas}</TableCell>
              <TableCell>{f.saldoFinal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default FechamentoCaixaPage;
