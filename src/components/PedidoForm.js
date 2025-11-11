import React, { useState } from 'react';
import { usePedidos } from '../context/PedidoContext';
import { TextField, Button, Paper, Typography, Alert } from '@mui/material';

const PedidoForm = () => {
  const { addPedido } = usePedidos();
  const [pedido, setPedido] = useState({ valorTotal: '', estado: '', eppIds: '', idEmpresa: '' });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pedidoData = {
      valorTotal: Number(pedido.valorTotal),
      estado: pedido.estado,
      eppIds: pedido.eppIds.split(',').map(id => Number(id.trim())),
      idEmpresa: Number(pedido.idEmpresa) 
    };

    try {
      await addPedido(pedidoData);
      setMessage({ type: 'success', text: 'Pedido creado!' });
      setPedido({ valorTotal: '', estado: '', eppIds: '', idEmpresa: '' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al crear el pedido: ' + err.message });
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom></Typography>

      {message && (
        <Alert severity={message.type} style={{ marginBottom: '15px' }}>
          {message.text}
        </Alert>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <TextField
          label="ID de Empresa"
          name="idEmpresa"
          value={pedido.idEmpresa}
          onChange={handleChange}
          required
        />
        <TextField
          label="Valor Total"
          name="valorTotal"
          value={pedido.valorTotal}
          onChange={handleChange}
          required
        />
        <TextField
          label="IDs de EPP (separados por coma)"
          name="eppIds"
          value={pedido.eppIds}
          onChange={handleChange}
          required
        />
        <TextField
          label="Estado"
          name="estado"
          value={pedido.estado}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="success">
          Crear 
        </Button>
      </form>
    </Paper>
  );
};

export default PedidoForm;
