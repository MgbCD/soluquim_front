import React, { useEffect, useState } from 'react';
import { usePedidos } from '../context/PedidoContext';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, CircularProgress, Pagination, Typography, Chip,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const PedidoList = () => {
  const { pedidos, fetchPedidos, loading } = usePedidos();
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const size = 10;

  useEffect(() => {
    fetchPedidos(page - 1, size);
  }, [page]);

  const handlePageChange = (event, value) => setPage(value);

  const handleOpen = (pedido) => {
    setPedidoSeleccionado(pedido);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPedidoSeleccionado(null);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'PENDIENTE': return 'warning';
      case 'APROBADO': return 'success';
      case 'RECHAZADO': return 'error';
      default: return 'default';
    }
  };

  return (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>Pedidos</Typography>
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Empresa</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Detalle</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidos.map((pedido) => (
                  <TableRow key={pedido.id}>
                    <TableCell>{pedido.id}</TableCell>
                    <TableCell>{pedido.empresa}</TableCell>
                    <TableCell>
                      <Chip label={pedido.estado} color="default" />
                    </TableCell>
                    <TableCell>${pedido.valorTotal}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleOpen(pedido)}>
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={10}
            page={page}
            onChange={handlePageChange}
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
          />

          {/* Modal de detalle del pedido */}
          <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Detalle del Pedido</DialogTitle>
            <DialogContent>
              {pedidoSeleccionado && (
                <List>
                  <ListItem>
                    <ListItemText primary="ID" secondary={pedidoSeleccionado.id} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Empresa" secondary={pedidoSeleccionado.empresa} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Estado" secondary={pedidoSeleccionado.estado} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Valor Total" secondary={`$${pedidoSeleccionado.valorTotal}`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Items" secondary={pedidoSeleccionado.items.join(', ')} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Fecha de Registro" secondary={pedidoSeleccionado.fechaRegistro || 'No disponible'} />
                  </ListItem>
                </List>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">Cerrar</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Paper>
  );
};

export default PedidoList;
